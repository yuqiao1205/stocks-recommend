#!/bin/bash
# https://www.duckdns.org/domains
# https://stockshub.duckdns.org
# for setup: chmod u+x ./duckdns.sh 
# only run: ./duckdns.sh

TOKEN="7aebeb9b-6e9c-4151-98be-7a2f8615b932"
DOMAIN="stockshub"
IP=$(ipconfig getifaddr en0)

echo "Updating DuckDNS for domain $DOMAIN with IP $IP"

# Update DuckDNS
RESPONSE=$(curl -s "https://www.duckdns.org/update?domains=$DOMAIN&token=$TOKEN&ip=$IP")

echo "DuckDNS Update Response: $RESPONSE"