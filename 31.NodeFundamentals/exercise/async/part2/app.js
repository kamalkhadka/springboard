const BASE_URL = "https://deckofcardsapi.com/api";
let deckId = "";
async function drawACard() {
  let resp = await axios.get(`${BASE_URL}/deck/new/draw/?count=1`);
  // deckId = resp.data["deck_id"];
  let cards = resp.data["cards"];
  for (let card of cards) {
    let value = card["value"];
    let suit = card["suit"];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }
}

async function drawTwoCardFromSameDeck() {
  let resp1 = await axios.get(`${BASE_URL}/deck/new/shuffle/?deck_count=1`);
  deckId = resp1.data["deck_id"];
  let resp2 = await axios.get(`${BASE_URL}/deck/${deckId}/draw/?count=2`);
  let cards = resp2.data["cards"];

  for (let card of cards) {
    let value = card["value"];
    let suit = card["suit"];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }
}

$(async function () {
  let resp = await axios.get(`${BASE_URL}/deck/new/shuffle/?deck_count=1`);
  deckId = resp.data["deck_id"];
  if (deckId) {
    $("#card-button").show();
  }

  $("#card-button").on("click", async function () {
    let $cardDiv = $("#game");
    let $img = $("<img>");
    resp = await axios.get(`${BASE_URL}/deck/${deckId}/draw/?count=1`);
    if (resp.data["success"]) {
      for (let card of resp.data["cards"]) {
        $img.attr("src", card["image"]);
        $cardDiv.prepend($img);
      }
    } else {
        $cardDiv.prepend("<h2>All cards drawn</h2>");
        $("#card-button").hide();
    }
  });
});
