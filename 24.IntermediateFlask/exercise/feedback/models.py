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

    username = db.Column(db.Text(length=20), primary_key = True)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text(50), unique = True)
    first_name = db.Column(db.Text(30), nullable=False)
    last_name = db.Column(db.Text(30), nullable=False)

    @classmethod
    def register(cls, password):
        """Hash password and return a new user"""
        hashed = bcrypt.generate_password_hash(password).decode('utf-8')
        return cls(password=hashed)



