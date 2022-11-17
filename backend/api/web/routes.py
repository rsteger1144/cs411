import json
import requests
from . import temp

from flask import request
#from app import db

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


# for the NASA api, only have image after 1995-06-20

# example call http://localhost:5000/nasaImage?imgDate=1995-06-20

def getImages(date):
    """
    Input: None
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
        # print(response.url)
        dict = {}
        dict["url"] = response.json()["url"]
        dict["date"] = date
        return dict
    except Exception as e:
        return (str(e))


@temp.route("/nasaImage")
def nasaImage():

    return json.dumps(getImages(request.args.get("imgDate")))


