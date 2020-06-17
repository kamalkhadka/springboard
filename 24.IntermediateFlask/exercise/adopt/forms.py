from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import Optional, InputRequired, URL, NumberRange, AnyOf

class PetForm(FlaskForm):
    """Form to add a pet"""
    name = StringField('Pet Name', validators=[InputRequired('Pet name is required')])
    species = StringField('Species', validators=[InputRequired(), AnyOf(values=['cat', 'dog', 'porcupine'])])
    photo_url = StringField('Photo Url', validators=[Optional(), URL()])
    age = IntegerField('Pet Age', validators=[NumberRange(min=0, max=30)])
    notes = TextAreaField('Notes')
    available = BooleanField('Available')