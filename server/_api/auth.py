from flask_restful import Resource
from flask import request
from server._mongo.models import User


class Register(Resource):
	def post(self):
		data = request.get_json(force=True)
		name, email, password, password2 = data['name'], data['email'], data['password'], data['password2']
		user = User(name=name,email=email,password=password)
		user.encrypt_pass()
		user.save()
		return { 'id': str(user.id)	}, 200

class Login(Resource):
	def post(self):
		data = request.get_json(force=True)
		email, password = data['email'], data['password']
		return {
			'request':{
				'email': email,
				'password': password
			}
		}, 200