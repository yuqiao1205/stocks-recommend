# every day at 1:10 PM, PST after the market closes, gather the symbols of the top losers and send it in a message using pushover

from daily_losers import get_daily_losers
from pushover import send_pushover_message
import schedule
import time

def send_daily_losers():
    losers = get_daily_losers()
    symbols = ", ".join([loser['symbol'] for loser in losers['daily_losers']])
    message = f"Top daily losers: {symbols}"
    send_pushover_message(message, title="Daily Losers")

def main():
    # Schedule the function to run daily at 1:10 PM
    schedule.every().day.at("19:12").do(send_daily_losers)

    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    main()
    