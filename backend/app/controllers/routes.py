from flask import render_template, Blueprint, request,jsonify
from app.controllers.base import *
from flask_cors import CORS,cross_origin
from datetime import datetime
blueprint = Blueprint('pages', __name__)

def enable_cors(route_function):
    return CORS(route_function)

CORS(blueprint)
 

@blueprint.route('/',methods=['GET'])
def home():
    body = request.get_json()
    
    return {
        "message":"Hoo hacks"
    }

 



@blueprint.route('/scanimg', methods=['POST'])
@cross_origin(origin='*',headers=['Authorization', 'Content-Type', 'Accept','Access-Control-Allow-Origin'])
def ScanImg():
    body = request.get_json()
    print('this is req bo',body)
    data = run_inference(body['uri'],True)
    res = classifier(data)
    return jsonify({
        'message': res,
        'prediction': data,
        "uri":body['uri'],
        'time':datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

 
