const blue = {
  name: "Blue",
  breed: "Scottish Fold",
  dance: function (dance) {
    console.log("THIS IS: ", this);
    console.log(`Meow, I am a ${this.breed} and I like to ${dance}`);
  },
  play: function (...toys) {
    for (let toy of toys) {
      console.log(`${this.name} plays with ${toy}`);
    }
  },
  greet() {
    alert(`${this.name} SAYS MEOW`);
  },
};

const bDance = blue.dance;
const boundDance = bDance.bind(blue);

// binding argument
const blueDisco = blue.dance.bind(blue, "disco");

// binding multiple arguments
const playWithSocks = blue.play.bind(blue, "left sock", "right sock");

const bobsMembership = {
  name: "Bob",
  total: 250,
  collectMontlyFee: function (fee) {
    const remaining = this.total - fee;
    this.total = remaining;
    return this.name + " remaining balance: " + remaining;
  },
};

function popUp(msg) {
  alert("Secret message is " + msg);
}

const btn1 = document.querySelector("#btn1").addEventListener('click', popUp.bind(null, 'Button 1 Says Hi'));
const btn2 = document.querySelector("#btn2").addEventListener('click', popUp.bind(null, 'Button 2 Says Hi'));
const btn3 = document.querySelector("#btn3").addEventListener('click', popUp.bind(null, 'Button 3 Says Hi'));
btn1.addEventListener("click", blue.greet.bind(blue));
