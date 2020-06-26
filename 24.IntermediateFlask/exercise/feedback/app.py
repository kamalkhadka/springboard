from flask import Flask, render_template, redirect
from models import db, connect_db, User
from forms import UserForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback_db'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/')
def home_page():
    """Get root"""
    return redirect('/register')

@app.route('/register')
def create_user():
    """Route to display the form to create a user""""
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(password)
        new_user.username = username
        new_user.email = email
        