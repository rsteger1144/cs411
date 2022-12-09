import base64
import shutil
import tempfile
import json
import requests
from pymongo import MongoClient
from . import temp

from flask import request, abort
#from app import db

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

cid = "replace with your client id"
secret = "replace with your secret"
auth_manager = SpotifyClientCredentials() #uses env variables 
#auth_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(auth_manager=auth_manager)

client = MongoClient("mongodb+srv://CS411Group8:ZbjBnkmqepiweev2@cluster0.mzh0ktn.mongodb.net/test")
db = client["flask_db"]

def homepage_data():
    """
    Input: None
    Output: Hello World
    """
    try:
        data = dict()
        data["Init"] = "Hello World!"
        return data
    except Exception as e:
        return (str(e))

@temp.route("/")
def root_site():
    return homepage_data()

def get_album_release_date(album_name, artist_name):
    """
    Input: album name and artist name
    return: teh release date of provided album
    """

    results = sp.search(q = "album:" + album_name + " artist:" + artist_name, type = "album,artist")
    # print (results)
    albums = results["albums"]["items"]
    # print (albums)
    
    if len(albums) == 0:
        #Nothing was found with params
        return 400

    #Iterate through all matching params
    for item in albums:
        #iterate through all artists associated
        for artist in item['artists']:
            #If artist and album name match return the release date
            #We will just return the first one that matches
            if artist['name'].lower() == artist_name.lower():
                if item['name'].lower() == album_name.lower():
                    return item['release_date']
    return 400

# for the NASA api, only have image after 1995-06-20
# example call http://localhost:5000/nasaImage?imgDate=1995-06-20
def get_nasa_image(date):
    """
    Input: release date of album
    return: a URL of the image
    """
    try:
        if date == None:
            return "date is required"
        params = {
            "date": date,
            "api_key": "5878VE4xRlytSxseglYIvUdptjap2M9wZvG07DUv"
        }
        
        response = requests.get("https://api.nasa.gov/planetary/apod",params=params)
        return response.json()["url"]
    except Exception as e:
        return 400

def nasa_image(album_name, artist_name, token):
    rel_date = get_album_release_date(album_name, artist_name)
    
    if type(rel_date) is int:
        #return error message
        return abort(rel_date) 
    
    url = get_nasa_image(rel_date)
    if type(url) is int:
        #return error message
        return abort(url)
    #create temp directory for session
    dirpath = tempfile.mkdtemp()
    filepath = dirpath + url.split("/")[-1]
    r = requests.get(url, stream = True)

    # Check if the image was retrieved successfully
    if r.status_code == 200:
        r.raw.decode_content = True
        with open(filepath,'wb') as f:
            shutil.copyfileobj(r.raw, f)
    else:
        return 400
    
    spotifyUrl = "https://api.spotify.com/v1/me"

    response = requests.get(spotifyUrl, 
                            headers = {"Authorization": "Bearer " + token})

    if response.status_code == 200:
        username = response.json()["display_name"]
    
    #send to frontend
    file = open(filepath, 'rb')
    dict = {}
    # dict["image"] = base64.b64encode(file.read()).decode() #to DECODE in frontend: base64.b64decode(dict["image"])
    dict["image"] = url
    dict["release_date"] = rel_date
    dict["username"] = username
    
    #clean up temp dir
    shutil.rmtree(dirpath)
    return dict

def submitToken(token):
    #check if token exists in db
    cursor = db.users.find({"token": token})
    tokenCount = db.users.count_documents({"token": token})
    
    if(tokenCount == 1):
        # set up new key value
        tFound = "Token found"
    else:
        # do nothing print()
        tFound = "Token not found"
    return

@temp.route("/nasaImage")
def nasaImage():
    token = request.args.get("token")
    submitToken(token)
    album = request.args.get("album")
    artist = request.args.get("artist")
    #get data from db and send with this (some changes would still need to be made)
    return json.dumps(nasa_image(album, artist, token))

def submitToDB(token, url, album, artist, rel_date):
    #submit new thing to db
    db.image.insert({
        "token": token,
        "url": url,
        "album": album,
        "artist": artist,
        "rel_date": rel_date,
    })
    return


@temp.route("/submitImage", methods = ['POST'])
def submitImage():
    submitToDB(
        request.form['token'],
        request.form['url'],
        request.form['album'],
        request.form['artist'],
        request.form['rel_date']
    )
    return 200


