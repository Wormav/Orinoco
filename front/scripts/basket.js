document.addEventListener("DOMContentLoaded", function () {
  // recupère les produit dans le LS puis les transforme en obj

  const arrayProducts = JSON.parse(localStorage.getItem("products"));
  const listingProduct = document.getElementById("listingProduct");
  const priceTotal = document.getElementById("total");
  const btnCleanBasket = document.getElementById("btnCleanBasket");
  const btnBuy = document.getElementById("btnBuy");

  //génére le résumé de la commande

  function getOrdered() {
    for (let item in arrayProducts) {
      let li = document.createElement("li");
      listingProduct.appendChild(li);
      li.innerText = `${arrayProducts[item].name} X ${arrayProducts[item].quantity} = `;
      li.classList.add("mt-3");

      let spanPrice = document.createElement("span");
      li.appendChild(spanPrice);
      spanPrice.innerHTML = `${arrayProducts[item].price} €`;
    }

    let total = 0;

    if (localStorage.getItem("products") !== null) {
      for (let i = 0; i < arrayProducts.length; i++) {
        total += arrayProducts[i].price;
      }

      priceTotal.innerText = total + " €";
    }
  }

  // vide le panier et recharge la page

  function cleanBasket() {
    btnCleanBasket.addEventListener("click", () => {
      localStorage.removeItem("products");
      location.reload();
    });
  }

  btnBuy.addEventListener("click", (e) => {
    // recupération des input
    let inputName = document.getElementById("name");
    let inputFirstName = document.getElementById("firstName");
    let inputAddress = document.getElementById("address");
    let inputPostalCode = document.getElementById("postalCode");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("mail");
    let inputPhoneNumber = document.getElementById("phoneNumber");

    // on crée des reg

    let regPostalCode = new RegExp(/[0-9]{5}/, "g");
    let regPhoneNumber = new RegExp(/^(\+33\s[1-9]{8})|(0[1-9]\s{8})$/);
    let regMail = new RegExp(/^([w-.]+)@((?:[w]+.)+)([a-zA-Z]{2,4})/i);

    // si un champs n'est pas remplie une alert ce déclanche

    if (
      !inputName.value ||
      !inputFirstName.value ||
      !inputAddress.value ||
      !inputPostalCode.value ||
      !inputCity.value ||
      !inputMail.value ||
      !inputPhoneNumber.value
    ) {
      alert("Veuilliez remplir tout les champs du fomrulaire");
    }

    // si un champs n'est pas bon
    else if (isNaN(inputPostalCode.value)) {
      inputPostalCode.classList.add("border-danger", "border-5");
    } else if (isNaN(inputPhoneNumber.value)) {
      inputPhoneNumber.classList.add("border-danger", "border-5");
    }
  });

  // fonction qui actualise l'icone du panier

  numberBasket();

  // fonction qui génére le résumé de la commande

  getOrdered();

  // fonction qui vide le localStorage donc le panier

  cleanBasket();
});
