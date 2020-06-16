from unittest import TestCase

from app import app
from models import db, User, Post

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_blogly'
app.config['SQLALCHEMY_ECHO'] = True

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class PostViewsTestCase(TestCase):
    """Test for Post model and related views"""

    def setUp(self):
        db.create_all()
        user = User(first_name='Kamal',last_name='Khadka', image_url='http://placehold.jp/150x150.png')
        db.session.add(user)
        db.session.commit()
        post = Post(title='Test Post', content='Hello World!', user_id = user.id)
        db.session.add(post)
        db.session.commit()

    def tearDown(self):
        db.drop_all()

    def test_get_post_for_user(self):
        with app.test_client() as client:
            user = User.query.filter_by(first_name='Kamal').first()
            resp = client.get(f'/users/{user.id}/posts/new')

            self.assertEqual(resp.status_code, 200)
            self.assertIn(user.get_full_name(), resp.get_data(as_text=True))

    def test_submit_post_for_user(self):
        """Create a post and submit"""
        with app.test_client() as client:
            user = User.query.filter_by(first_name='Kamal').first()
            data = {"title": "test 2", "content": "posting test post for a user"}
            resp = client.post(f'/users/{user.id}/posts/new', data=data, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)

            html = resp.get_data(as_text = True)
            # submitting a post redirect to user details page where a post title is shown
            self.assertIn(data['title'], html)

    def test_get_post_by_id(self):
        """Test get request to /posts/<post_id>"""
        with app.test_client() as client:
            post = Post.query.get(1)
            resp = client.get(f'/posts/{post.id}')

            self.assertEqual(resp.status_code, 200)

            html = resp.get_data(as_text=True)

            self.assertIn(post.title, html)
            self.assertIn(post.content, html)
            self.assertIn(post.user.get_full_name(), html)

    def test_edit_post(self):
        """
        Test for posting to route /posts/[post-id]/edit
        Edit a post and submit - check for updated post
        """
        with app.test_client() as client:
            post = Post.query.get(1)
            post.title = 'Title changed'
            post.content = 'Content changed'

            data = {'title': post.title, 'content': post.content}

            resp = client.post(f'/posts/{post.id}/edit', data=data, follow_redirects=True)

            self.assertEqual(200, resp.status_code)
            
            html = resp.get_data(as_text=True)

            self.assertIn(post.title, html)
            self.assertIn(post.content, html)
            self.assertIn(User.query.get(post.user_id).get_full_name(), html)