const cat = {
  name: "blue",
  breed: "scottish fold",
  dance: function (dance) {
    console.log("This is : ", this);
    console.log(`Meow, I am ${this.name} and I like to ${dance}`);
  },
  play: function (...toys) {
    for (let toy of toys) {
      console.log(`${this.name} plays with ${toy}`);
    }
  }
};

class Cat {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  dance(danceType) {
    console.log("This IS: ", this);
    console.log(`Meow, I am a ${this.breed} and I like to ${danceType}`);
  }
}

// const bluesDance = cat.dance;

const rocket = new Cat("rocket", "tabby");
rocket.dance("tango");

const rocketDance = rocket.dance;
// rocketDance("tango");

const dog = {
  name: "elton",
  breed: "Elton",
};
