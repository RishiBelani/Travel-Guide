from fastapi import FastAPI
import requests
import json
import openai
import os

app = FastAPI()

url = "https://test.api.amadeus.com/v1/security/oauth2/token"

payload = 'client_id=vAotiGVO4wbZALr8vL3slWD8LApwAuuu&client_secret=Zgx6CsnGE9QO2yd1&grant_type=client_credentials'
headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload)
auth_token=response.json()


openai.api_key = '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'

messages=[
      {"role": "system", "content": "You are a helpful Travel Guide."}
]


@app.get("/flights")
async def search_flights(returnDate=None,originLocationCode="DEL",destinationLocationCode="GOI",departureDate="2023-05-04",adults="1"):
    if returnDate!=None:
        url = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode="+originLocationCode+"&destinationLocationCode="+destinationLocationCode+"&departureDate="+departureDate+"&returnDate="+returnDate+"&adults="+adults+"&max=5&currencyCode=INR"
    else:
        url = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode="+originLocationCode+"&destinationLocationCode="+destinationLocationCode+"&departureDate="+departureDate+"&adults="+adults+"&max=5&currencyCode=INR"

    payload = {}
    headers = {
    'Authorization': 'Bearer '+auth_token["access_token"]
    }

    response = requests.request("GET",url, headers=headers, data=payload)

    return response.text

@app.get("/nearbyCities")
async def nearby_cities(cityCodes):
    url = "https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes="+cityCodes
    payload = {}
    headers = {
    'Authorization': 'Bearer '+auth_token["access_token"]
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text

@app.get("/chatgpt")
def update_chat(content,role="user"):
  messages.append({"role": role, "content": content})
  return summary(messages)

def summary(messages):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    if response.choices[0].message!=None:
        return response.choices[0].message["content"]
        #print(response.choices[0].message["content"])

    else :
        return 'Failed to Generate response!'
