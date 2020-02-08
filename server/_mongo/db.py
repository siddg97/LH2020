from flask_mongoengine import MongoEngine

db = MongoEngine()

def make_db(app):
	db.init_app(app)