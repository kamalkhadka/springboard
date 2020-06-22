const BASE_URL = "http://localhost:5000/api";
const cupcakes = $("#cupcakes");

$(showCupcakes);

async function showCupcakes(){
   const response = await axios.get(`${BASE_URL}/cupcakes`);
   for(let cupcake of response.data.cupcakes){
        let cupcake_html = createCupcakeHTML(cupcake);
        cupcakes.append(cupcake_html);
   }
}

function createCupcakeHTML(cupcake){
    console.log("HERE");
    return `<li><strong>Flavor:</strong> ${cupcake.flavor} <strong>Rating:</strong> ${cupcake.rating} <strong>Size:</strong> ${cupcake.size}</li>`;
}

$("#create-new").on('click', async function(evt){
    evt.preventDefault();

    const response = await axios.post(`${BASE_URL}/cupcakes`, {
        "flavor": $("#flavor").val(),
        "rating": $("#rating").val(),
        "size": $("#size").val(),
        "image": $("#image").val()
    });

    const cupcake_html = createCupcakeHTML(response.data.cupcake);
    cupcakes.append(cupcake_html);
})