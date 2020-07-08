"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


from app import app, CURR_USER_KEY
import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app


# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()

    def test_add_message(self):
        """Can use add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

    def test_create_message_without_session(self):
        with self.client as c:
            resp = c.post("/messages/new",
                          data={"text": "Hello"}, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", resp.get_data(as_text=True))

    def test_create_message_with_invalid_user(self):
        with self.client as c:
            with c.session_transaction() as session:
                session[CURR_USER_KEY] = 1000

            resp = c.post("/messages/new",
                          data={"text": "Hello"}, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", resp.get_data(as_text=True))

    def test_get_message(self):

        with self.client as client:
            with client.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser.id

            message = Message(text="hello", user_id=self.testuser.id)
            db.session.add(message)
            db.session.commit()

            message = Message.query.filter_by(text="hello").first()

            resp = client.get(f"/messages/{message.id}")

            self.assertEqual(resp.status_code, 200)
            self.assertIn(message.text, resp.get_data(as_text=True))

    def test_get_message_with_invalid_id(self):
        with self.client as client:
            with client.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser.id

            resp = client.get("/messages/1000")

            self.assertEqual(resp.status_code, 404)

    def test_delete_message_by_owner(self):
        with self.client as client:
            with client.session_transaction() as session:
                session[CURR_USER_KEY] = self.testuser.id

            message = Message(text="hello", user_id=self.testuser.id)
            db.session.add(message)
            db.session.commit()

            message = Message.query.filter_by(text="hello").first()

            resp = client.post(
                f"/messages/{message.id}/delete", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)

            message = Message.query.filter_by(text="hello").first()
            self.assertIsNone(message)

    def test_delete_message_no_authentication(self):
        with self.client as client:
            message = Message(text="hello", user_id=self.testuser.id)
            db.session.add(message)
            db.session.commit()

            message = Message.query.filter_by(text="hello").first()

            resp = client.post(
                f"/messages/{message.id}/delete", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", resp.get_data(as_text=True))

    def test_delete_message_no_authorization(self):
        user = User.signup(
                username="user1", email="user1@test.com", password="user1pass", image_url=None) 
        
        db.session.add(user)
        db.session.commit()
        user = User.query.filter_by(username=user.username).first()

        message = Message(text="hello", user_id= self.testuser.id)
        db.session.add(message)
        db.session.commit()

        message = Message.query.filter_by(text="hello").first()

        with self.client as client:

            with client.session_transaction() as session:
               session[CURR_USER_KEY] = user.id

            resp = client.post(f"/messages/{message.id}/delete", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", resp.get_data(as_text=True))
