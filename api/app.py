from flask import Flask, jsonify
from flask_cors import CORS
from daily_losers import get_daily_losers

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/', methods=['GET'])
def get_homepage():
    return jsonify({'message': 'Hello, World!'})

@app.route('/fin', methods=['GET'])
def get_fin():
    return jsonify(get_daily_losers())

if __name__ == '__main__':
    app.run(debug=True)
