from flask import Flask, render_template, redirect, flash, session
from forms import UserForm, LoginForm, FeedbackForm
from models import db, connect_db, User, Feedback
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback_db'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SECRET_KEY'] = 'chicken123'

connect_db(app)


@app.route('/')
def home_page():
    """Get root"""
    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def create_user():
    """Route to display the form to create a user"""
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(password=password, username=username,
                                 email=email, first_name=first_name, last_name=last_name)

        db.session.add(new_user)
        try:
            db.session.commit()
            session['username'] = new_user.username
            return redirect(f'/users/{new_user.username}')
        except IntegrityError:
            db.session.rollback()
            flash('Username is already taken. Try different one.')
            return redirect('/register')

    return render_template('register.html', form=form)


@app.route('/users/<username>')
def user_page(username):
    if 'username' in session:
        user = User.query.get_or_404(username)
        feedbacks = user.feedbacks
        return render_template('user.html', user=user, feedbacks=feedbacks)
    else:
        flash('Please login first')
        return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login_user():
    """Display a form and validate form"""
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            flash("You don't have permission")
            return redirect('/login')
    return render_template('login.html', form=form)


@app.route('/logout')
def logout_user():
    """This function logs out a user and removes it from session"""
    session.pop('username')
    flash('Logged out successfully')
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    form = FeedbackForm()
    if 'username' in session:
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            feedback = Feedback(
                title=title, content=content, username=username)
            db.session.add(feedback)
            db.session.commit()
            return redirect(f'/users/{username}')
    return render_template('add-feedback.html', username=username, form=form)

@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if feedback.user.username == session.get('username'):
        db.session.delete(feedback)
        db.session.commit()
        return redirect(f"/users/{session['username']}")
    else:
        flash('You don''t have permission')
        return redirect('/')

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    """ View function to handle delete user """
    if session['username']:
        user = User.query.get_or_404(username)
        db.session.delete(user)
        db.session.commit()
        session.pop('username')
        return redirect('/')
    else:
        flash('You don''t have a permission')
        return redirect('/')

@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    """ View function to update feedback """
    if 'username' not in session:
        flash('You are not authorized')
        return redirect('/')

    feedback = Feedback.query.get_or_404(feedback_id)
    
    form = FeedbackForm(obj=feedback)
    
    if session.get('username') == feedback.user.username and form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.add(feedback)
        db.session.commit()

        return redirect(f'/users/{feedback.user.username}')
    else:
        return render_template('update-feedback.html', form=form, feedback_id = feedback.id)
