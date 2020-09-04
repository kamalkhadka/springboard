$(document).ready(function () {
  const BASE_URL = "http://localhost:3000";
  const currItems = $("#current-items");
  const addItem = $("#add-item");
  addItem.on("submit", (evt) => {
    addAnItem(evt, BASE_URL, currItems);
  });
  getItems(BASE_URL, currItems);
});

function addAnItem(evt, BASE_URL, currItems) {
  evt.preventDefault();
  const name = $("#name").val();
  const price = $("#price").val();

  const item = {
    name,
    price,
  };

  $.ajax({
    contentType: "application/json",
    data: JSON.stringify(item),
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
    error: function () {
      console.log("Error");
    },
    processData: false,
    type: "POST",
    url: BASE_URL + "/items",
  });
  currItems.text("");
  getItems(BASE_URL, currItems);
}

function getItems(url, currItems) {
  $.get(`${url}/items`, function (data) {
    data.map((item) =>
      currItems.append(
        `<li id="${item.name}"><b>Name:</b> ${item.name} <b>Price: </b>${item.price}</li>`
      )
    );
  });
}
