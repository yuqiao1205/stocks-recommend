import yfinance as yf
import pandas as pd
from pprint import pprint

# https://ranaroussi.github.io/yfinance/index.html

def get_daily_losers():
    s = yf.Screener()
    s.set_predefined_body('day_losers')

    data = s.response

    tickers = []
    for quote in data['quotes']:
        if quote['marketCap'] > 10e9:
            if quote['fullExchangeName'] not in ('NasdaqGS', 'NYSE'):
                continue
            print(quote['symbol'], quote['regularMarketChangePercent'], quote['marketCap'] / 1e9)
            tickers.append({
                'symbol': quote['symbol'],
                'change_percent': quote['regularMarketChangePercent'],
                'market_cap': quote['marketCap'] / 1e9,
                'name': quote['shortName']
            })
    # return tickers
    return {
        'daily_losers': tickers
    }

if __name__ == '__main__':
    print(get_daily_losers())
