from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Pet(db.Model):
    """Pet"""
    __tablename__ = 'pets'

    def __repr__(self):
        """Show info about pet."""
        p = self
        return f"<Pet {p.id} {p.name} {p.species} {p.hunger}>"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    species = db.Column(db.String(30))
    hunger = db.Column(db.Integer, nullable=False, default=20)

