import requests
import os
from dotenv import load_dotenv

load_dotenv()

ALPHAVANTAGE_API_KEY = os.getenv('ALPHAVANTAGE_API_KEY')

print(ALPHAVANTAGE_API_KEY)

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMD&apikey={ALPHAVANTAGE_API_KEY}'
r = requests.get(url)
data = r.json()

import pandas as pd
import json

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

# Extract the 'Time Series (Daily)' data
time_series = data['Time Series (Daily)']

# Convert the data into a DataFrame
df = pd.DataFrame.from_dict(time_series, orient='index')

# Rename the columns to more user-friendly names
df.rename(columns={
    '1. open': 'Open',
    '2. high': 'High',
    '3. low': 'Low',
    '4. close': 'Close',
    '5. volume': 'Volume'
}, inplace=True)

# Ensure the index is treated as a datetime type
df.index = pd.to_datetime(df.index)

# Sort the DataFrame by date in ascending order
df.sort_index(inplace=True)

# Convert numeric columns to proper data types
df = df.astype({
    'Open': 'float',
    'High': 'float',
    'Low': 'float',
    'Close': 'float',
    'Volume': 'int'
})

# Print the DataFrame
print(df)

# Save the DataFrame to a CSV file (optional)
# df.to_csv('stock_data.csv', index=True)
import pandas as pd
import mplfinance as mpf



# Convert index to datetime and ensure data types are numeric



# Generate a candlestick chart
mpf.plot(
    df,
    type='candle',  # Candlestick chart
    style='yahoo',  # Chart style
    title='Stock Prices',
    volume=True,    # Add a volume subplot
    savefig='candlestick_chart.png'  # Save chart as a PNG file
)

print("Candlestick chart saved as 'candlestick_chart.png'")
