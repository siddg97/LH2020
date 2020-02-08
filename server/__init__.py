from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_mongoengine import MongoEngine

from server._api.auth import Register, Login

from server._mongo.db import make_db

def create_app(test_config=None):
	# initialze flask instance
	app = Flask(__name__)
	CORS(app)
	# config app from .env file
	app.config.from_envvar('DOTENV')
	# initialize db instance
	make_db(app)
	# password hashing config
	bcrypt = Bcrypt(app)
	# JWT config
	jwt = JWTManager(app)
	# enable REST API
	api = Api(app)

	api.add_resource(Register,'/register')
	api.add_resource(Login,'/login')

	return app