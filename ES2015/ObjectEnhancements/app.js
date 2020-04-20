function createInstructor(firstName, lastName){
    return {
        firstName,
        lastName
    }
}

// computed property names

var favoriteNumber = 42;

var instructor = {
    firstName: 'Colt',
    [favoriteNumber] : "That is my favorite!"
}


// object methods es2015
var instructor = {
    firstName: "Colt",
    sayHi() {
        return "Hi!";
    },
    sayBye() {
        return this.firstName + " says bye!";
    }
}

function createAnimal(species, verb, noise){
    return {
        species, 
        [verb] : () => noise
    }
}