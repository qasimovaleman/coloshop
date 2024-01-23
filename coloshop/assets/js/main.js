const productCrdLists = document.querySelector(".productCrdLists");
const BASE_URL = `http://localhost:8080`;
const menu = document.querySelector(".menu");
////////
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  drawCards(response.data);
}
getData("shopping");
/////////
function drawCards(data) {
  productCrdLists.innerHTML = "";
  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "product-card";
    ///
    const productImageElement = document.createElement("img");
    productImageElement.className = "product-image";
    productImageElement.src = element.imageUrl;
    //
    const productDescriptionElement = document.createElement("p");
    productDescriptionElement.className = "product-description";
    productDescriptionElement.innerText = element.description;
    //
    const productPriceElement = document.createElement("h6");
    productPriceElement.className = "product-price";
    productPriceElement.innerText = `$ ${element.price}`;
    //
    const productButtonElement = document.createElement("a");
    productButtonElement.className = "product-details";
    productButtonElement.innerText = "VIEW";
    productButtonElement.href = `details.html?id=${element.id}`;
    productCardElement.append(
      productImageElement,
      productDescriptionElement,
      productPriceElement,
      productButtonElement
    );
    //
    productCrdLists.append(productCardElement);
  });
}
///////////
menu.addEventListener("click", function () {
  this.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-xmark")
    : (this.classList = "fa-solid fa-bars");
});
