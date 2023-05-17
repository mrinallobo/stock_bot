from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from alpha_vantage.timeseries import TimeSeries
import requests

app = Flask(__name__)
CORS(app)

API_KEY = 'XAV338CPBOZAZ9R0'
ts = TimeSeries(key=API_KEY)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/stock/<symbol>')
def get_stock(symbol):
    data, _ = ts.get_daily(symbol=symbol, outputsize='compact')
    return jsonify(data)

@app.route('/search')
def search_stock():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    url = f'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={query}&apikey={API_KEY}'
    response = requests.get(url)
    result = response.json()
    return jsonify(result.get('bestMatches', []))

if __name__ == '__main__':
    app.run(debug=True)
