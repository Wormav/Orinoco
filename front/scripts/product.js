const url = "http://localhost:3000/api/cameras";
const mainContainer = document.querySelector("main");
const btn = document.querySelector("button");
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
      let img = document.querySelector("#img");
      img.src = returnAPI.imageUrl;

      // name
      let name = document.querySelector("#name");
      name.innerText = returnAPI.name;

      //description
      let description = document.querySelector("#description");
      description.innerText = returnAPI.description;

      //prix
      let price = document.querySelector("#price");
      returnAPI.price = returnAPI.price / 100;
      price.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(returnAPI.price);
    });
}

getItemProduct();
