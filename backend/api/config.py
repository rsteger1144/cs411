import os
basedir = os.path.abspath(os.path.dirname(__file__))
postgres_local_base = ''
database_name = ''

class Config:
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = postgres_local_base + database_name

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = postgres_local_base + database_name

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = postgres_local_base + database_name

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}