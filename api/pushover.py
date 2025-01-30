import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get Pushover credentials from environment
TOKEN = os.getenv("PUSHOVER_APP_TOKEN")
USER = os.getenv("PUSHOVER_USER_KEY")


def send_pushover_message(message: str, title: str = "Notification") -> None:
    """Send a Pushover notification."""
    url = "https://api.pushover.net/1/messages.json"
    payload = {"token": TOKEN, "user": USER, "message": message, "title": title}
    response = requests.post(url, data=payload)

    if response.status_code == 200:
        print("Notification sent successfully!")
    else:
        print(f"Error: {response.status_code}, {response.text}")


# Example usage
if __name__ == "__main__":
    send_pushover_message("Hello from Python!", "Test Alert")
    
