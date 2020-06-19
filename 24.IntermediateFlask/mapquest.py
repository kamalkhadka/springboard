import requests

key = ''

response = requests.get('http://www.mapquestapi.com/geocoding/v1/address', params={'key': key, 'location': 'Denver, CO'})
