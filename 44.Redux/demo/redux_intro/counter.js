const h1 = document.querySelector("h1");

const incButton = document.querySelector("#increment");

const decButton = document.querySelector("#decrement");

const reset = document.querySelector("#reset");

incButton.addEventListener("click", function (e) {
  store.dispatch({ type: "INCREMENT" });
  const state = store.getState();
  h1.innerText = state.count;
});

decButton.addEventListener("click", function (e) {
  store.dispatch({ type: "DECREMENT" });
  const state = store.getState();
  h1.innerText = state.count;
});

reset.addEventListener("click", function (e) {
  store.dispatch({ type: "RESET" });
  const state = store.getState();
  h1.innerText = state.count;
});
