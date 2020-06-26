from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


def connect_db(app):
    """Connect to database"""
    db.app = app
    db.init_app(app)


class User(db.Model):
    """User model class"""
    __tablename__ = "users"

    username = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String(50), unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    feedbacks = db.relationship('Feedback', cascade='delete')

    @classmethod
    def register(cls, password, username, email, first_name, last_name):
        """Hash password and return a new user"""
        hashed = bcrypt.generate_password_hash(password).decode('utf-8')
        return cls(password=hashed, username=username, email=email, first_name=first_name, last_name=last_name)

    @classmethod
    def authenticate(cls, username, password):
        """ Authenticate a user"""
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else: 
            return False

class Feedback(db.Model):
    """ Feedback model """
    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    username = db.Column(db.String, db.ForeignKey('users.username'))

    user = db.relationship('User')
