document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:3000/api/cameras";
  const mainContainer = document.querySelector("main");
  const imgProduct = document.querySelector("#img");
  const nameProduct = document.querySelector("#name");
  const descriptionProduct = document.querySelector("#description");
  const priceProduct = document.querySelector("#price");
  const btn = document.querySelector("#btn");
  const quantityInput = document.querySelector("input#selection");
  const cardBody = document.querySelector("#cardBody");

  let quantitySelect = 1;
  let returnPrice = 0;

  // recupere l'id du produit dans l'url

  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");

  //appel API avec ID pour un produit et intégration dans le html

  function getItemProduct() {
    fetch(url + "/" + id)
      .then(function (response) {
        return response.json();
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

        priceProduct.innerText = returnAPI.price / 100 + " €";

        returnPrice = returnAPI.price;

        // actualise la variable quantity et le prix en fonction
      })
      .catch((error) => {
        alert("un problème est survenu.");
      });
  }

  getItemProduct();

  quantityInput.addEventListener("input", (e) => {
    quantitySelect = e.target.value;
    priceProduct.innerText = (returnPrice / 100) * quantitySelect + " €";
  });

  // click du btn acheter

  function addInBasket() {
    btn.addEventListener("click", () => {
      if (quantitySelect > 0 && quantitySelect < 101) {
        let productADD = {
          name: nameProduct.innerHTML,
          price: parseFloat(priceProduct.innerText),
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

        // animation de confirmation et recharge la page

        alert("Ajouté au pannier !");
        location.reload()
      } else {
        alert("La quantité doit être comprise entre 1 et 100");
      }

      // actualise icone panier 

      let arrayProducts = JSON.parse(localStorage.getItem("products"));
      let numberProduct = document.getElementById("numberShop");
      numberProduct.innerText = arrayProducts.length;
    });
  }

  addInBasket();
  numberBasket();
});
