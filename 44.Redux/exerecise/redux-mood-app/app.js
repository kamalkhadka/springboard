const mood = document.querySelector("#mood");
const happyBtn = document.querySelector("#happy");
const sadBtn = document.querySelector("#sad");
const angryBtn = document.querySelector("#angry");
const confusedBtn = document.querySelector("#confused");

document.addEventListener(
  "DOMContentLoaded",
  function () {
    changeMood(moodStore.getState().mood);
  },
  false
);

happyBtn.addEventListener("click", () => {
  moodStore.dispatch({ type: "HAPPY", payload: "(•‿•)" });
  changeMood(moodStore.getState().mood);
});

sadBtn.addEventListener("click", () => {
  moodStore.dispatch({ type: "SAD", payload: "（´＿｀）" });
  changeMood(moodStore.getState().mood);
});

angryBtn.addEventListener("click", () => {
  moodStore.dispatch({ type: "ANGRY", payload: "ఠ ͟ಠ" });
  changeMood(moodStore.getState().mood);
});

confusedBtn.addEventListener("click", () => {
  moodStore.dispatch({ type: "CONFUSED", payload: "ఠ_ఠ" });
  changeMood(moodStore.getState().mood);
});

const changeMood = (newMood) => {
  mood.innerText = newMood;
};
