from flask import Flask
from flask_cors import CORS

# initialze flask instance
app = Flask(__name__)
# enable CORS access
cors = CORS(app)

@app.route('/')
def hello():
	return { 'data':'Hello World!'},200

# main routine
if __name__ == '__main__':
	app.run(port=5000, debug=True)