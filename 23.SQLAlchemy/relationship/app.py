from flask import Flask, render_template
from models_employee import db, connect_db, Department, Employee

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///employee_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chicken"

connect_db(app)


@app.route('/phones')
def list_phones():
    emps = Employee.query.all()
    return render_template('phones.html', emps = emps)
