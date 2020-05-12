async function getRandomDog() {
  const res = await axios.get("https://dog.ceo/api/breeds/image/random");
  console.log(res.data.message);
  const img = document.querySelector("#dog");
  img.src = res.data.message;
}

// error handling
async function getDogByBreed(breed) {
  try {
    const res = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const img = document.querySelector("#dog");
    img.src = res.data.message;
  } catch (err) {
    console.log(err);
    alert("breed not found");
    getRandomDog();
  }
}

const form = document.querySelector("#searchForm");
const input = document.querySelector("#search");
form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(input.value);
  getDogByBreed(input.value);
  input.value = "";
});

// axios get with params
async function getJoke(firstName, lastName) {
  // let res = await axios.get(`http://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}`);
  let res = await axios.get("http://api.icndb.com/jokes/random", {
    params: { firstName, lastName },
  });
  console.log(res.data.value.joke);
}

// axios post request
async function getUsers() {
  const res = await axios.get("https://reqres.in/api/users");
  console.log(res);
}

async function createUser() {
  const res = await axios.post("https://reqres.in/api/users", {
    username: "ButtersTheChicken",
    email: "hello@world.com",
    age: 1,
  });
  console.log(res);
}

async function getUsers() {
  let rest = await axios.get("https://hack-or-snooze-v3.herokuapp.com/users");
  console.log(res);
}

async function signUp(username, password, name) {
  const res = await axios.post("https://hack-or-snooze-v3.herokuapp.com/signup", {
    user: { name, username, password },
  });
  console.log(res);
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthYXNkZmFzZG0iLCJpYXQiOjE1ODg1MzE1MDd9.Tkl2-dJ7dGokEirn8a2apB1rVX-dxYHvlxw6lODJgmY"
//kaasdfasdm : U
//Chickaddfads : P