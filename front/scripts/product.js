const url = "http://localhost:3000/api/cameras";
const mainContainer = document.querySelector("main");
const imgProduct = document.querySelector("#img");
const nameProduct = document.querySelector("#name");
const descriptionProduct = document.querySelector("#description");
const priceProduct = document.querySelector("#price");
const btn = document.querySelector("#btn");
const quantityInput = document.querySelector("input#selection");
let quantitySelect = 1;

// recupere l'id du produit dans l'url

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

//appel API avec ID pour un produit et intégration dans le html

function getItemProduct() {
  fetch(url + "/" + id)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      alert("un problème est survenu.");
    })
    .then(function (returnAPI) {
      const item = returnAPI;
      //   console.log(item); // pour vérifier que l'appel fonctionne

      // img

      imgProduct.src = returnAPI.imageUrl;

      // name

      nameProduct.innerText = returnAPI.name;

      //description

      descriptionProduct.innerText = returnAPI.description;

      //prix

      returnAPI.price = returnAPI.price / 100;
      price.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(returnAPI.price);
    });
}

getItemProduct();

// actualise la variable quantity

quantityInput.addEventListener("change", (e) => {
  quantitySelect = e.target.value;
});

// click du btn acheter

function addInBasket() {
  btn.addEventListener("click", () => {
    if (quantitySelect > 0 && quantitySelect < 100) {
      let productADD = {
        name: nameProduct.innerHTML,
        price: parseFloat(priceProduct.innerHTML),
        quantity: parseFloat(quantitySelect),
        _id: id,
      };

      // ----------------------------------- Local Storage ----------------------------- //

      let arrayProductsBasket = [];

      // si déja ajouter les elements au array

      if (localStorage.getItem("products") !== null) {
        arrayProductsBasket = JSON.parse(localStorage.getItem("products"));
      }

      // puis on push l array

      arrayProductsBasket.push(productADD);
      localStorage.setItem("products", JSON.stringify(arrayProductsBasket));
    }
  });
}

addInBasket();
