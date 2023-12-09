from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def get_data():
    return jsonify({"message": "Hello, this is your Flask API"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
