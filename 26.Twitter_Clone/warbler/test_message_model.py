
import os

# Change DATABASE_URI environment variable to use test database
os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app
from unittest import TestCase
from models import db, User, Message

class MessageModelTestCase(TestCase):

    def setUp(self):
        db.drop_all()
        db.create_all()

        user1 = User.signup(username="user1", email="user1@test.com", password="user1pass", image_url=None)

        self.user1 = User.query.filter_by(username=user1.username).first()
    
    def tearDown(self):
        db.session.rollback()
        db.drop_all()

    def test_create_message(self):
        message = Message(text="message1", user_id = self.user1.id)

        db.session.add(message)
        db.session.commit()

        message = Message.query.filter_by(text="message1").first()

        self.assertIsNotNone(message)
        self.assertEqual(message.text, "message1")

    def test_message_user(self):
        message = Message(text="message1", user_id = self.user1.id)

        db.session.add(message)
        db.session.commit()

        self.assertIn(self.user1.id,[msg.user_id for msg in self.user1.messages])

    def test_message_likes(self):
        message = Message(text="message1", user_id = self.user1.id)

        db.session.add(message)
        db.session.commit()


        User.signup(username="user2", email="user2@test.com", password="user2pass", image_url=None)

        user2 = User.query.filter_by(username="user2").first()

        user2.likes.append(message)
        db.session.commit()

        self.assertIsNotNone(user2.likes)
        self.assertIn(message.id, [msg.id for msg in user2.likes])