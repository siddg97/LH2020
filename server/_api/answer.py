from flask_restful import Resource
from flask import request
import requests

def fetch_result(passage, question):
    url = 'https://machinereading.azurewebsites.net/api'
    PARAMS = {'question':question, "passage":passage}
    r = requests.post(url = url, json=PARAMS)

    return r.text


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
