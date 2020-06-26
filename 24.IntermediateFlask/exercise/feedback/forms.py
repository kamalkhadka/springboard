from flask_wtf import FlaskFrom
from wtforms import StringField, PasswordField

class UserForm(FlaskForm):
    """Form to collect user details"""

    username = StringField('Enter username')
    password = PasswordField('Enter password')
    email = StringField('Enter email')
    first_name = StringField('Enter first name')
    last_name = StringField('Enter last name')