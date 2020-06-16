"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    """User Model"""

    __tablename__ = 'users'

    def __repr__(self):
        user = self
        return f'<User: id={user.id} first_name={user.first_name} last_name={user.last_name}>'
    
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False, default='http://placehold.jp/150x150.png')
    
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

class Post(db.Model):
    """Post model"""
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.TEXT, nullable=False)
    content = db.Column(db.TEXT, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id') )
    user = db.relationship('User', backref='posts')


class Tag(db.Model):
    """Tag"""
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True)
    posts = db.relationship('Post', secondary='posts_tags', backref='tags')

class PostTag(db.Model):
    """Post Tag"""
    __tablename__ = "posts_tags"

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)


