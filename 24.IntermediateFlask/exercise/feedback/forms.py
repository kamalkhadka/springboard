from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import InputRequired


required = InputRequired()


class UserForm(FlaskForm):
    """Form to collect user details"""

    username = StringField('Enter username', validators=[required])
    password = PasswordField('Enter password', validators=[required])
    email = StringField('Enter email', validators=[required])
    first_name = StringField('Enter first name', validators=[required])
    last_name = StringField('Enter last name',validators=[required])

class LoginForm(FlaskForm):
    """Form to get login information"""
    username = StringField('Username', validators=[required])
    password = PasswordField('Password', validators=[required])

class FeedbackForm(FlaskForm):
    """ Form to collect feedback information """
    title = StringField("Title", validators=[required])
    content = TextAreaField('Content', validators=[required])