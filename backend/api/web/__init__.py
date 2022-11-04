from flask import Blueprint

temp = Blueprint('temp', __name__)

from . import routes