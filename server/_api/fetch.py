from flask_restful import Resource
from flask import request
from .utils import main
from .utils import html_to_data

class Url(Resource):
    def post(self):
        try:
            data = request.get_json(force=True)
            url = data['url']
            summary = main(html_to_data(url))

            return {
                'result': summary
            }, 200
        except Exception as e:
            return {
                'isValid': False,
                'msg': str('Something went wrong. Please try again later.')
			}

class Text(Resource):
    def post(self):
        try:
            data = request.get_json(force=True)
            text = data['text']
            summary = main(text)

            return {
                'result': summary
            }, 200
        except Exception as e:
            return {
                'isValid': False,
                'msg': str('Something went wrong. Please try again later.')
			}
