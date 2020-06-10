"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy


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
