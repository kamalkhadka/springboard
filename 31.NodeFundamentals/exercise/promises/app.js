$(document).ready(function () {
  const url = "http://numbersapi.com/";

//   1.
  axios
    .get(url + "10?json")
    .then((data) => {
      let resp = data.data;
      $("#fav-number-fact").text(resp.text);
    })
    .catch((err) => console.log(err));

    //2.
  axios
    .get(url + "1..100")
    .then((data) => {
      Object.keys(data.data).forEach(function (key) {
        $("#mul-numbers-fact").append(data.data[key]).append("<br>");
      });
    })
    .catch((err) => console.log(err));

    // 3.

    let fourNumbersPromises = [];

    for (let i = 1; i < 5; i++){
        fourNumbersPromises.push(
            axios.get(url + "10?json")
        );
    }

    Promise.all(fourNumbersPromises)
    .then(numberArr => numberArr.forEach(data => 
        $("#four-facts").append(data.data.text).append("<br>")))
    .catch( err => console.log(err))

 
});
