// global variables
const $scoreHolder = $("#score");
const $alertMsg = $("#alert-msg");
// initialize score of 0
let score = 0;
const words = new Set();
let $guess = $("#guess");

$(function () {
  $("#guess-submit").on("click", (evt) => {
    evt.preventDefault();

    if (!words.has($guess.val()) && $guess.val().length !== 0) {
      let point = $guess.val().length;
      words.add($guess.val());
      axios
        .get("/guess", { params: { guess: $guess.val() } })
        .then(function (response) {
          data = response.data;
          // TODO - validate response data - check data exist

          postScore(point, data.result);
          postAlert($guess.val(), data.result);
        });
    } else if (words.has($guess.val())) {
      postAlert(`You have already entered: ${$guess.val()}`);
    } else {
      postAlert("Please fill form");
    }
  });
});

function postScore(point, result) {
  if (result === "ok") {
    score += point;
    $scoreHolder.text(score);
  }
}

function postAlert(msg, result = "na") {
  $alertMsg.text("");
  if (result === "ok") {
    $alertMsg.text(`"${msg}" is in the board.`);
  } else if (result === "not-on-board") {
    $alertMsg.text(`"${msg}" is not in the board.`);
  } else if (result === "not-word") {
    $alertMsg.text(`"${msg}" is not a word.`);
  } else {
    $alertMsg.text(`${msg}`);
  }
  $alertMsg.removeClass("d-none");
  $guess.val("");
}

const timerId = setInterval(timer, 1000);
let $time = $("#timer");

function timer() {
  if ($time.text() === "0") {
    $("#guess-form").remove();
    $("#new-game").removeClass("d-none");
    sendScore(score);
    clearInterval(timerId);
  } else {
    $time.text(parseInt($time.text()) - 1);
  }
}

function sendScore(score) {
  axios
    .post("/score", {
      score: score,
    })
    .then(function (response) {
      data = response.data;
      // console.log(data);
      $("#played").text(data.played);
      $("#highest-score").text(data.score);
    });
}
