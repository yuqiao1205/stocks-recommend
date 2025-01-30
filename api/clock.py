from pushover import send_pushover_message
from datetime import datetime
import time


def main():
    while 1:
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        print("Current Time =", current_time)
        send_pushover_message(f"Current Time: {current_time}")
        time.sleep(10)

if __name__ == "__main__":
    main()
            