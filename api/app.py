from flask import Flask, jsonify
from flask_cors import CORS
from daily_losers import get_daily_losers
from spiker1 import get_timeseries

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/', methods=['GET'])
def get_homepage():
    return jsonify({'message': 'Hello, World!'})

@app.route('/check', methods=['GET'])
def home():
    return "<h1>Hello, World!</h1>"

@app.route('/fin', methods=['GET'])
def get_fin():
    return jsonify(get_daily_losers())

@app.route('/timeseries/<string:symbol>', methods=['GET'])
def get_fin_symbol(symbol):
    return jsonify(get_timeseries(symbol))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 
