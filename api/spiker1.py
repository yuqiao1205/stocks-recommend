import requests
import os
from dotenv import load_dotenv
import pandas as pd
import json

load_dotenv()
ALPHAVANTAGE_API_KEY = os.getenv('ALPHAVANTAGE_API_KEY')

def get_timeseries(symbol):
    # replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={ALPHAVANTAGE_API_KEY}'
    r = requests.get(url)
    data = r.json()
    data["meta"] = data.pop("Meta Data")
    data["data"] = data.pop("Time Series (Daily)")

    # data is a map, turn it into an list of maps
    # "2024-07-11":{"1. open":"184.0700","2. high":"187.1100","3. low":"177.2500","4. close":"181.9400","5. volume":"59231412"} ->
    # [..., {"date": "2024-07-11", "open": "184.0700", "high": "187.1100", "low": "177.2500", "close": "181.9400", "volume": "59231412"}, ...]
    # transform the names 
    badName2goodName = {
        "1. open": "open",
        "2. high": "high",
        "3. low": "low",
        "4. close": "close",
        "5. volume": "volume"
    }
    data["data"] = [{"date": date, **values} for date, values in data["data"].items()]
    for row in data["data"]:
        for badName, goodName in badName2goodName.items():
            row[goodName] = row.pop(badName)

    # first row
    # response.data[0]["date"]
    # response.data[0] -> {"date": "2024-07-11", "open": "184.0700", "high": "187.1100", "low": "177.2500", "close": "181.9400", "volume": "59231412"}

    return data 

# # The provided JSON data
# data = {
#     'Meta Data': {
#         '1. Information': 'Daily Prices (open, high, low, close) and Volumes',
#         '2. Symbol': 'IBM',
#         '3. Last Refreshed': '2024-11-29',
#         '4. Output Size': 'Compact',
#         '5. Time Zone': 'US/Eastern'
#     },
#     'Time Series (Daily)': {
#         '2024-11-29': {'1. open': '228.5000', '2. high': '230.3388', '3. low': '227.1989', '4. close': '227.5100', '5. volume': '2640238'},
#         '2024-11-27': {'1. open': '228.8300', '2. high': '229.1900', '3. low': '224.2700', '4. close': '226.9200', '5. volume': '2995121'},
#         '2024-11-26': {'1. open': '226.7300', '2. high': '228.9800', '3. low': '225.5115', '4. close': '228.8300', '5. volume': '4449543'},
#         # Add other dates here
#     }
# }

def main():
    print(get_timeseries('MSFT'))

if __name__ == '__main__':
    main()
