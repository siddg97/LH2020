from flask_restful import Resource
from flask import request
from .utils import fetch_result


class Answer(Resource):
    def post(self):
        try:
            data = request.get_json(force=True)
            passage, question = data['passage'], data['question']
            answer = fetch_result(passage, question)
        
            return {
                'answer': answer
            }, 200
        except Exception as e:
            return {
                'isValid': False,
                'msg': str('Something went wrong. Please try again later.')
			}
