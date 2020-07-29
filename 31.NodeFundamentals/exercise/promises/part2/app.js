$(document).ready(function () {
  const base_url = "https://deckofcardsapi.com/api/deck";

  // 1.
  $.getJSON(base_url + "/new/draw/?count=1")
    .then((data) => {
      data.cards.forEach((card) =>
        console.log(card.value + " of " + card.suit)
      );
    })
    .catch((err) => console.log(err));

  //2
  let cardOne = "";
  $.getJSON(base_url + "/new/shuffle/?deck_count=1")
    .then((data) => {
      return data.deck_id;
    })
    .then((deckId) => {
      return $.getJSON(base_url + `/${deckId}/draw/?count=1`);
    })
    .then((data) => {
      cardOne = data.cards[0];
      return $.getJSON(base_url + `/${data.deck_id}/draw/?count=1`);
    })
    .then((data) => {
      console.log(cardOne.value + " of " + cardOne.suit);
      console.log(data.cards[0].value + " of " + data.cards[0].suit);
    })
    .catch((err) => console.log(err));

  // 3.
  let $button = $("#give-me-card");
  let $cardDiv = $("#card");

  let deckId = $.getJSON(base_url + "/new/shuffle/?deck_count=1").then(
    (data) => {
      deckId = data.deck_id;
    }
  );

  $button.on("click", function () {
    $.getJSON(base_url + `/${deckId}/draw/?count=1`)
      .then((data) => {
        if (data.remaining != 0) {
          let $img = $("<img>");
          $img.attr("src", data.cards[0].image);
          $cardDiv.prepend($img);
        } else {
          $cardDiv.prepend("<h1>All cards drawn</h1>");
          $button.hide();
        }
      })
      .catch((err) => console.log(err));
  });
});
