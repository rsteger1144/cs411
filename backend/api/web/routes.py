import requests
from . import temp
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

def getImages():
    """
    Input: None
    return: a URL of the image
    """
    try:
        params = {
            "date": "2021-05-01",
            "api_key": "5878VE4xRlytSxseglYIvUdptjap2M9wZvG07DUv"
        }
        
        response = requests.get("GET https://api.nasa.gov/planetary/apod",params=params)
        print(response.url)
        dict = {}
        dict["url"] = response.url
        dict["hasImage"] = True
        return dict
    except Exception as e:
        return (str(e))


@temp.route("/nasaImage")
def root_site():
    return getImages()

