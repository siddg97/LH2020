from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class User(db.Document):
	name = db.StringField(required=True)
	email = db.EmailField(required=True,unique=True)
	password = db.StringField(required=True, min_length=6)

	def encrypt_pass(self):
		""" Encrypt password before saving """
		self.password = generate_password_hash(self.password).decode('utf8')

	def check_pass(self, password):
		""" Check if hashed password matches given password """
		return check_password_hash(self.password, password)