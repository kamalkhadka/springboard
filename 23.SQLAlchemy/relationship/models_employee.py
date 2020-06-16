from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Department(db.Model):
    """Department Model"""

    __tablename__ = 'departments'

    dept_code = db.Column(db.Text, primary_key=True)
    dept_name = db.Column(db.Text, nullable=False, unique=True)
    phone = db.Column(db.Text)


class Employee(db.Model):
    """Employee Model"""
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    state = db.Column(db.Text, nullable=False, default='CA')
    dept_code = db.Column(db.Text, db.ForeignKey('departments.dept_code'))

    dept = db.relationship('Department', backref='employees')


class Project(db.Model):
    __tablename__ = 'projects'

    proj_code = db.Column(db.Text, primary_key = True)
    proj_name = db.Column(db.Text, nullable=False, unique = True)

class EmployeeProject(db.Model):
    __tablname__ = 'employees_projects'

    emp_id = db.Column(db.Intgeer, db.ForeignKey('employees.id'), primary_key=True)
    proj_code = db.Column(db.Text, db.ForeignKey('projects.proj_code'), primary_key=True)

    role = db.Column(db.Text)



def phone_dir_join():
    """Show employees with a join."""
    emps = (db.session.query(Employee.name, Department.dept_name, Department.phone)
            .join(Department).all())

    for name, dept, phone in emps:
        print(name, dept, phone)


def get_directory_join():
    directory = db.session.query(Employee.name, Department.dept_name,
                     Department.phone).join(Department).all()

    for name, dept, phone in directory:
        print(name, dept, phone)

def get_directory_join_class()
    directory = db.session.query(Employee, Department).join(Department).all()

    for emp, directory from directory:
        print(emp.name, directory.dept_name)