from app import app
from unittest import TestCase
from models import User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

app.config['WTF_CSRF_ENABLED'] = False

BASE_URL = "http://localhost:5000/"

class Test_Authentication(TestCase):
    """ Testing authentication """

    def setUp(self):
        self.username = "user2"
        self.password = "user2"


    def test_good_user(self):
        """ Test case for good username """
        user = User.authenticate(self.username, self.password)
        
        self.assertIsNotNone(user)
        self.assertEqual(user.username, self.username)

    def test_bad_user(self):
        """ Test case for bad username """
        username = "user2"
        password = "abcd"
        user = User.authenticate(username, password)
        
        # user should be false
        self.assertFalse(user)

    def test_login_route_with_good_user(self):
      
        with app.test_client() as client:
            resp = client.post(f'{BASE_URL}/login', 
                data={"username": self.username, "password": self.password}, 
                follow_redirects=True)
            
            self.assertEqual(resp.status_code, 200)
            resp_as_string = resp.get_data(as_text=True)
            self.assertIn(self.username, resp_as_string)

    def test_login_with_bad_username(self):
        self.password = "badpass"

        with app.test_client() as client:
            resp = client.post(f'{BASE_URL}/login', data={"username": self.username, "password": self.password},
                follow_redirects=True)
            resp_as_string = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Invalid username / password", resp_as_string)