from flask import redirect
from flask_restful_swagger_3 import Resource


class Home(Resource):
    def get(self):
        return redirect('/swagger')
