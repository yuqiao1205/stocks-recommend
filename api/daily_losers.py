import yfinance as yf

def get_daily_losers():
    # Fetch data from your API
    s = yf.Screener()
    s.set_predefined_body('day_losers')

    data = s.response

    # Parse and filter the response
    tickers = []
    for quote in data['quotes']:
        # Check for valid market cap, exchange, and percentage change
        if (
            quote.get('marketCap') and quote.get('regularMarketChangePercent') and
            quote['marketCap'] > 10e9 and
            quote['fullExchangeName'] in ('NasdaqGS', 'NYSE')  # Include only NasdaqGS or NYSE
        ):
            tickers.append({
                'symbol': quote['symbol'],
                'change_percent': quote['regularMarketChangePercent'],
                'market_cap': quote['marketCap'] / 1e9,  # Convert to billions
                'regularMarketPreviousClose': quote['regularMarketPreviousClose'],
                'name': quote['shortName'],
                'exchange': quote['fullExchangeName']
            })

    # Sort by change_percent (ascending order for losers) and take the top 10
    top_10_losers = sorted(tickers, key=lambda x: x['change_percent'])[:10]

    return {'daily_losers': top_10_losers}

if __name__ == '__main__':
    result = get_daily_losers()
    for loser in result['daily_losers']:
        print(f"Symbol: {loser['symbol']}, Name: {loser['name']}, Change: {loser['change_percent']}%, Market Cap: {loser['market_cap']}B, Exchange: {loser['exchange']}")