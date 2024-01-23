const tBody = document.querySelector("tbody");
const search = document.querySelector(".search");
const sort = document.querySelector(".sort");
//
const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
//
const BASE_URL = `http://localhost:8080`;
//
let editId = null;
let arr;
//
let products = null;
let productsCoppy = null;
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  // console.log(response.data);
  drawTable(response.data);
  arr = response.data;
  products = response.data;
  productsCoppy = structuredClone(products);
}
getData("shopping");
///
function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
        <td>${element.id}</td>
        <td><img src="${element.imageUrl}" alt="" class="product-image"></td>
        <td>${element.description}</td>
        <td>"$"${element.price}</td>
        <td> <button class="delete" onclick=deleteProduct("${element.id}",this)>DELETE</button> </td>
        <td><button class="edit" onclick=editBtn("${element.id}")>EDIT</button></td>
        
        `;
    tBody.append(trElement);
  });
}
////////
function deleteProduct(id, btn) {
  if (window.confirm("do you want to delete product??")) {
    axios.delete(`${BASE_URL}/shopping/${id}`);
    btn.closest(".product-card").remove();
  }
}
/////////////
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    imageUrl: `./assets/images/${allInputs[0].value.split("\\")[2]}`,
    description: allInputs[1].value,
    price: allInputs[2].value,

    //
  };

  if (!editId) {
    if (
      allInputs[0].value != "" &&
      allInputs[1].value != "" &&
      allInputs[2].value != ""
    ) {
      await axios.post(`${BASE_URL}/shopping`, obj);
    } else {
      alert("Bow buraxmaq olmaz!!");
    }
  } else {
    await axios.patch(`${BASE_URL}/shopping/${editId}`, obj);
  }
});
/////////////
async function editBtn(id) {
  editId = id;
  const response = await axios(`${BASE_URL}/shopping/${id}`);
  allInputs[1].value = response.data.description;
  allInputs[2].value = response.data.price;
}
////////////
search.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered;
  filtered = arr.filter((item) =>
    item.description
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  console.log(filtered);
  drawTable(filtered);
});
/////////////////
sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText == "Ascending") {
    sorted = products.sort((a, b) =>
      a.description.localeCompare(b.description)
    );
    this.innerText = "Descending";
  } else if (this.innerText == "Descending") {
    sorted = products.sort((a, b) =>
      b.description.localeCompare(a.description)
    );
    this.innerText = "Default";
  } else {
    this.innerText = "Ascending";
    sorted = productsCoppy;
  }
  drawTable(sorted);
});
