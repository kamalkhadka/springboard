const BASE_URL = "http://numbersapi.com"

async function getNumberFact(num){
    const resp = await axios.get(`${BASE_URL}/${num}/trivia?json`);
    console.log(resp.data["text"]);
}

getNumberFact(20); // fav number fact

async function getFactsForMultipleNums(listOfNums){
    const nums = listOfNums.join(",");
    const resp = await axios.get(`${BASE_URL}/${nums}/trivia`)
    listOfNums.forEach(num => {
        let $li = $("<li>").text(resp.data[num]);
        $("#mul-num-facts").append($li);
    });   
}

getFactsForMultipleNums([1,4,5,6,7]);

async function getFactsForFourFavNumber(nums){
    let fav1 = axios.get(`${BASE_URL}/${nums[0]}/trivia?json`)
    let fav2 = axios.get(`${BASE_URL}/${nums[1]}/trivia?json`)
    let fav3 = axios.get(`${BASE_URL}/${nums[2]}/trivia?json`)
    let fav4 = axios.get(`${BASE_URL}/${nums[3]}/trivia?json`)

    let facts = await Promise.all([fav1, fav2, fav3, fav4])
   
    let $favlist = $("#fav-four");
    facts.forEach(fact => {
        $favlist.append($("<li>").text(fact.data["text"]));
    })
}

getFactsForFourFavNumber([2,5,6,7]);

