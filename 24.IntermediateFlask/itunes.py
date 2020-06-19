import requests

res = requests.get('https://itunes.apple.com/search', params = {'term' : 'Jack Johnson', 'limit': 25})

data = res.json()

response = requests.post('https://en6310sdg3by8.x.pipedream.net', json={'username': 'chicken', 'password': 'pass'})
