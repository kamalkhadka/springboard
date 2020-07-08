import os

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"
os.environ['FLASK_ENV'] = "production"

from app import app, CURR_USER_KEY
from unittest import TestCase
from models import db, User, Follows

class UserViewTestCase(TestCase):

    def setUp(self):
        db.drop_all()
        db.create_all()

        user1 = User.signup(username="user1", email="user1@test.com", password="user1pass", image_url=None)
        user2 = User.signup(username="test1", email="testuser@test.com", password="testuser1pass", image_url=None)
        
        self.user1 = User.query.filter_by(username=user1.username).first()
        self.user2 = User.query.filter_by(username=user2.username).first()
        self.client = app.test_client()

    def test_search_users(self):
        with self.client as client:
            resp = client.get('/users')
            self.assertEqual(resp.status_code, 200)
            self.assertIn(self.user1.username, resp.get_data(as_text=True))
            self.assertIn(self.user2.username, resp.get_data(as_text=True))

    def test_search_user_query(self):
        with self.client as client:
            # search user based on query param
            resp2 = client.get("/users?q=test")
            self.assertEqual(resp2.status_code, 200)
            self.assertIn(self.user2.username, resp2.get_data(as_text=True))
            self.assertNotIn(self.user1.username, resp2.get_data(as_text=True))

    def test_users_show_for_existing_user(self):
        with self.client as client:
            resp = client.get(f"/users/{self.user1.id}")
            self.assertEqual(resp.status_code, 200)
            self.assertIn(self.user1.username, resp.get_data(as_text=True))

    def test_users_shows_for_non_existing_user(self):
        with self.client as client:
            resp = client.get("/users/1000")
            self.assertEqual(resp.status_code, 404)

    def test_show_followers_with_authorization(self):
        follow = Follows(user_being_followed_id=self.user2.id, user_following_id=self.user1.id)
        db.session.add(follow)
        db.session.commit()

        with self.client as client:
            with client.session_transaction() as session:
                session[CURR_USER_KEY] = self.user2.id

            resp = client.get(f'/users/{self.user2.id}/followers')
            self.assertEqual(resp.status_code, 200)

            self.assertIn("user1", resp.get_data(as_text=True))

    def test_show_following_with_auth(self):
        follow = Follows(user_being_followed_id=self.user2.id, user_following_id = self.user1.id)
        db.session.add(follow)
        db.session.commit()

        with self.client as client:
            with client.session_transaction() as session:
                session[CURR_USER_KEY] = self.user1.id

            resp = client.get(f'/users/{self.user1.id}/following')
            self.assertEqual(resp.status_code, 200)
            self.assertIn("test1", resp.get_data(as_text=True))