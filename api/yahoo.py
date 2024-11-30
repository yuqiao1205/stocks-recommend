import yfinance as yf
import pandas as pd
from pprint import pprint

s = yf.Screener()
s.set_predefined_body('day_losers')

# pretty print json (s.response, dict)
# pprint.pprint(s.response)
data = s.response

for quote in data['quotes']:
    if quote['marketCap'] > 10e9:
        if quote['fullExchangeName'] not in ('NasdaqGS', 'NYSE'):
            continue
        print(quote['symbol'], quote['regularMarketChangePercent'], quote['marketCap'] / 1e9)
        # pprint(quote)
        # print()


