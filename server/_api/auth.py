from flask_restful import Resource
from flask_jwt_extended import create_access_token
from flask import request
from server._mongo.models import User
from mongoengine.errors import NotUniqueError, DoesNotExist
import datetime

class Register(Resource):
	def post(self):
		try:
			data = request.get_json(force=True)
			name, email, password, password2 = data['name'], data['email'], data['password'], data['password2']
			# check for email
			user = User(name=name,email=email,password=password)
			user.encrypt_pass()
			user.save()
			return { 
				'isValid': True,
				'id': str(user.id)
			}, 200
		except NotUniqueError:
			return {
				'isValid': False,
				'msg': str('Email already exists!')
			}
		except Exception as e:
			return {
				'isValid': False,
				'msg': str('Something went wrong. Please try again later.')
			}

class Login(Resource):
	def post(self):
		data = request.get_json(force=True)
		email, password = data['email'], data['password']
		user = User.objects.get(email=email)
		auth = user.check_pass(password)
		if not auth:
			return {
				'isValid': False,
				'msg': str('Email or password do not match')
			}
		expires = datetime.timedelta(days=2)
		token = create_access_token(identity=str(user.id), expires_delta=expires)
		return { 
			'isValid':True,
			'token' : token 
		}, 200