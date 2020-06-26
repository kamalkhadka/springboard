from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    username = db.Column(db.Text, nullable=False, unique = True)
    password = db.Column(db.Text, nullable = False)

    @classmethod
    def register(cls, username, pwd):
        hashed = bcrypt.generate_password_hash(pwd)
        hashed_utf8 = hashed.decode('utf-8')

        return cls(username=username, password=hashed_utf8)

    @classmethod
    def authenticate(cls, username, pwd):
        u = User.query.filter_by(username=username).first()

        if u and bcrypt.check_password_hash(u.password, pwd):
            return u
        else:
            return False

class Tweet(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', backref='tweets')