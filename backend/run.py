from app import create_app
from flask_cors import CORS, cross_origin


app = create_app('config.development')
cors = CORS(app)
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5555)