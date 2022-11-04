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


