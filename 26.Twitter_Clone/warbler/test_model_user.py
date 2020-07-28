from models import User, connect_db, db

import os
from unittest import TestCase

os.environ['DATABASE_URL'] = 'postgresql:///warbler-test'

from app import app



class TestUserModel(TestCase):

    def setUp(self):
        db.create_all()

        self.user1 = User.signup(email="user1@gmail.com", username="user1", password="user1", image_url=None)
        self.user2 = User.signup(email="user2@gmail.com", username="user2", password="user2", image_url=None)
        db.session.add_all([self.user1, self.user2])
        db.session.commit()

    def tearDown(self):
        db.session.rollback()
        db.drop_all()


    # def test_user_repr_method(self):
        
    #     user = User.signup(email="test1@gmail.com", username="test1", password="test1", image_url=None)
    #     user.id = 20

    #     repr = user.__repr__()
        
    #     self.assertIsNotNone(repr)
    #     self.assertEquals(f'<User #20: {user.username}, {user.email}>', repr)

    # def test_is_user1_following_user2(self):
    #     self.user1.following.append(self.user2)
    #     db.session.commit()
        
    #     self.assertIsNotNone(self.user1.following)
    #     self.assertIn(self.user2, self.user1.following)
    
    # def test_user1_is_not_following_user2(self):
    #     self.user1.following.append(self.user2)
    #     db.session.commit()

    #     self.user1.following.remove(self.user2)
    #     db.session.commit()

    #     self.assertEquals(self.user1.following, [])
    #     self.assertNotIn(self.user2, self.user1.following)

    def test_is_followed_by(self):
        self.user2.following.append(self.user1)
        db.session.commit()

        # test user1 is followed by user2
        self.assertIsNotNone(self.user1.following)
        self.assertTrue(self.user2.following[0] == self.user1)

        self.user2.following.remove(self.user1)
        db.session.commit()

        # test user1 is not followed user2
        self.assertTrue(len(self.user2.following) == 0)



    
        



