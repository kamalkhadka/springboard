from flask-sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Pet(db.Model):
    """Pet model"""
    __tablename__ = 'pets'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable = False, default = True)

    def __repr__(self):
        return f'<Pet {self.name} {self.species} {self.age}>'

