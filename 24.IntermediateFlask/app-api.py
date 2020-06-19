from flask import Flask, render_template, request
import requests

API_KEY_URL = 'http://www.mapquestapi.com/geocoding/v1/address'
key = ''

app = Flask(__name__)

@app.route('/')
def show_address_form():
    return render_template('address_form.html')