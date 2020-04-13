const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    localStorage.setItem("clickCount", 0);
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  let target = event.target;
  changeBackgroundColor(target);

}

// when the DOM loads
createDivsForColors(shuffledColors);

function changeBackgroundColor(target) {
  if (!target.getAttribute('style')) {
    let clickCount = parseInt(localStorage.clickCount);
    clickCount++;
    if (clickCount <= 2) {
      target.style.backgroundColor = target.getAttribute('class');
      target.setAttribute('data-faceup', true);
      localStorage.setItem("clickCount", clickCount);
    }

    if (clickCount == 2) {
      let match = checkCardMatch();
    }

  }

}

function checkCardMatch() {
  let cardsFaceUp = document.querySelectorAll('div[data-faceup]');
  let card1 = cardsFaceUp[0];
  let card2 = cardsFaceUp[1];

  if (card1.getAttribute('class') === card2.getAttribute('class')) {
    card1.removeAttribute('data-faceup');
    card2.removeAttribute('data-faceup');
    localStorage.setItem("clickCount", 0);
  } else {
    setTimeout(foldCard, 1000);
  }
}

function foldCard() {
  let cards = document.querySelectorAll('div[data-faceup]');
  for (let card of cards) {
    card.removeAttribute('style');
    card.removeAttribute('data-faceup');
  }
  localStorage.setItem("clickCount", 0);
}
