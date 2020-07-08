"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data
# db.create_all()

class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""    
        db.create_all()

        user1 = User.signup(username="user1", email="user1@test.com", password="user1pass",image_url=None)
        
        user2 = User.signup(username="user2", email="user2@test.com", password="user2pass",image_url= None)

        self.user1 = User.query.filter_by(username=user1.username).first()
        self.user2 = User.query.filter_by(username=user2.username).first()

        self.user1_id = user1.id
        self.user2_id = user2.id

        self.client = app.test_client()

    def tearDown(self):
        db.session.rollback()
        db.drop_all()

  
    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

    def test_repr(self):
        user1 = User.query.get(self.user1_id)
        self.assertEqual(f"<User #{self.user1_id}: {self.user1.username}, {self.user1.email}>", user1.__repr__())
        
        user2 = User.query.get(self.user2_id)
        self.assertEqual(f"<User #{self.user2_id}: {self.user2.username}, {self.user2.email}>", user2.__repr__())

    def test_user1_is_following_user2(self):
        # Add user1 to user2 followers
        self.user2.followers.append(self.user1)
        db.session.commit()

        self.assertTrue(self.user1.is_following(self.user2))

    def test_user1_not_following_user2(self):
        self.assertFalse(self.user2.is_following(self.user2))

    def test_user1_is_followed_by_user2(self):
        self.user1.followers.append(self.user2)
        db.session.commit()

        self.assertTrue(self.user1.is_followed_by(self.user2))

    def test_user2_not_followed_by_user2(self):
        self.assertFalse(self.user2.is_followed_by(self.user2))

    def test_signup(self):
        user = User.signup(email="user3@test.com", username="user3", password="user3pass", image_url=None)

        user3 = User.query.filter_by(email="user3@test.com").first()

        self.assertEqual(user.email, user3.email)
        self.assertEqual(user.username, user3.username)

    def test_failed_signup(self):
        User.signup(username=self.user1.username, email = "user4@test.com", password="user4pass", image_url=None)
        self.assertRaises(exc.IntegrityError)

    def test_user_authenticate_with_valid_credentials(self):
        username = "user1"
        password = "user1pass"

        user = User.authenticate(username=username, password=password)

        self.assertIsNotNone(user)
        self.assertEqual(self.user1_id, user.id)

    def test_user_authenticate_with_invalid_username(self):
        username = "user8"
        password = "user8pass"

        user = User.authenticate(username=username, password=password)
        self.assertFalse(user)

    def test_user_authenticate_with_invalid_password(self):
        username = "user1"
        password = "passuser1"

        user = User.authenticate(username=username, password=password)
        self.assertFalse(user)


    


