from flask import Flask
from models import db, connect_db, Department

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://employee_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = 'CHICKEN'

connect_db(app)
