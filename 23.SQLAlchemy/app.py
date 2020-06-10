from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chicken"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_page():
    """Shows list of all pets in db"""
    pets = Pet.query.all()
    return render_template('list.html', pets = pets)

@app.route('/', methods=['POST'])
def create_pet():
    form = request.form
    name = form['name']
    species = form['species']
    hunger = int(form['hunger'])
    new_pet = Pet(name=name, species=species, hunger=hunger)
    db.session.add(new_pet)
    db.session.commit()
    return redirect(f'/pet/{new_pet.id}')

@app.route('/pet/<int:id>')
def show_pet(id):
    """Show details about a pet"""
    pet = Pet.query.get_or_404(id)
    return render_template('details.html', pet=pet)

@app.route('/species/<species_id>')
def show_pets_by_species(species_id):
    """Get all pets by species"""
    pets = Pet.get_by_species(species_id)
    return render_template('species.html', pets=pets, species=species_id)
