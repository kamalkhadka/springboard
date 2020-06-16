from unittest import TestCase

from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_blogly'
app.config['SQLALCHEMY_ECHO'] = True

app.config['TESTING'] = True

app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        db.create_all()
        user = User(first_name='Kamal',last_name='Khadka', image_url='http://placehold.jp/150x150.png')
        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        db.drop_all()

    def test_show_users(self):
        with app.test_client() as client:
            resp = client.get('/users')
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Kamal Khadka', html)

    def test_create_user(self):
        with app.test_client() as client:
            data = {"first-name": "Colt", "last-name": "Steele", "image-url": "http://placehold.jp/150x150.png"}
        
            resp = client.post('/users/new', data=data, follow_redirects = True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Colt Steele", html)

    def test_edit_user(self):
        with app.test_client() as client:
            user = User.query.get(1)

            user.first_name = "Lamak"

            data = {"first-name": user.first_name, "last-name": user.last_name, "image-url": user.image_url}
            resp = client.post(f'/users/{user.id}/edit', data = data, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Lamak Khadka", resp.get_data(as_text=True))

    def test_delete_user(self):
        with app.test_client() as client:
            user = User.query.get(1)
            resp = client.post(f'/users/{user.id}/delete', data = {}, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn("Kamal Khadka", resp.get_data(as_text=True))

