"""Blogly application."""

from flask import Flask, request, render_template, redirect
from models import db, connect_db, User
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'chickens'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/')
def users():
    return redirect('/users')

@app.route('/users')
def show_users():
    users = User.query.all()
    return render_template('users.html', users=users)


@app.route('/users/new')
def create_user():
    return render_template('create-user.html')

@app.route('/users/new', methods=['POST'])
def create_new_user():
    form = request.form
    first_name = form['first-name']
    last_name = form['last-name']
    image_url = form['image-url']
    user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:id>')
def show_user(id):
    user = User.query.get_or_404(id)
    return render_template('user-detail.html', user=user)

@app.route('/users/<int:id>/edit')
def show_edit_user(id):
    user = User.query.get_or_404(id)
    return render_template('edit-user.html', user=user)

@app.route('/users/<int:id>/edit', methods=['POST'])
def edit_user(id):
    user = User.query.get_or_404(id)
    
    form = request.form
    first_name = form['first-name']
    last_name = form['last-name']
    image_url = form['image-url']
    
    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url
    
    db.session.add(user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:id>/delete', methods=['POST'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')