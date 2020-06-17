from flask import Flask, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import PetForm

app = Flask(__name__)

app.config['SECRET_KEY'] = 'chickenz'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)


debug = DebugToolbarExtension(app)


@app.route('/')
def root():
    """Render root / index  page"""
    pets = Pet.query.all()
    return render_template('index.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def show_add_pet_form():
    """Route to add a pet"""
    form = PetForm()
    if form.validate_on_submit():
        pet = create_pet(form)
        db.session.add(pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('add_pet.html', form=form)


@app.route('/<int:id>', methods=['GET', 'POST'])
def display_edit_pet(id):
    """Show pet info and allow to edit pet"""
    pet = Pet.query.get_or_404(id)
    form = PetForm(obj=pet)
    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.available = form.available.data
        pet.notes = form.notes.data
        db.session.add(pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('display_pet.html', form=form)


def create_pet(form):
    """ Used to create a new pet"""
    name = form.name.data
    species = form.species.data
    photo_url = form.photo_url.data
    age = form.age.data
    notes = form.notes.data
    pet = Pet(name=name, species=species,
              photo_url=photo_url, age=age, notes=notes)
    return pet
