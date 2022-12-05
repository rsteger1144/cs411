
from flask import Flask
from flask_migrate import Migrate
from config import config
from flask_cors import CORS
from pymongo import MongoClient

def create_app(config_name):
    """
    Input: The type of configuration for this Flask app
    Output: Flask app
    Description: Create and return the Flask app
    """
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    CORS(app)
    client = MongoClient('localhost', 27017, username='CS411Group8', password='ZbjBnkmqepiweev2')

    from web import temp as main_blueprint
    app.register_blueprint(main_blueprint)

    db = client.flask_db
    todos = db.todos

    Migrate(app, db)

    return app