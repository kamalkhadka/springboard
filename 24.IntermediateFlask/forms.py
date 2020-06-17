from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField
from wtforms.validators import InputRequired, Email, Optional


class AddSnackForm(FlaskForm):

    email = StringField('Email', validators=[Optional(), Email()])
    name = StringField('Snack Name', validators=[InputRequired(message='Snack name can\'t be blank')])
    price = FloatField('Price in USD')
    is_healthy = BooleanField('This is a healthy snack')
    quantity = IntegerField('How many')

    category = SelectField('Category', 
                          choices=[('ic', 'Ice Cream'), ('chips', 'Potato Chips'), ('candy', 'Candy/Sweets')])


class EmployeeForm(FlaskForm):
    """ WTForm to add new employee """
    name = StringField('Employee Name', validators=[InputRequired(message='Name cannot be blank')])
    state = StringField('State')
    dept_code = SelectField('Department Code')
