const details = document.querySelector(".details");
const BASE_URL = `http://localhost:8080`;
////////
let id = new URLSearchParams(window.location.search).get("id");
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}/${id}`);
  console.log(response.data);
  drawCard(response.data);
}
getData("shopping");
////////
function drawCard(element) {
  details.innerHTML = "";
  details.innerHTML += `
  <div class="product-card">
  <img src="${element.imageUrl}" alt="" class="product-image"/>
  <p class="product-description">${element.description}</p>
  <h6 class="product-price">${element.price}</h6>
</div>
  `;
}
