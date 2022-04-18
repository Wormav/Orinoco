document.addEventListener("DOMContentLoaded", function () {
  // recupère les produit dans le LS puis les transforme en obj

  const arrayProducts = JSON.parse(localStorage.getItem("products"));
  const listingProduct = document.getElementById("listingProduct");
  const priceTotal = document.getElementById("total");
  const btnCleanBasket = document.getElementById("btnCleanBasket");
  const btnBuy = document.getElementById("btnBuy");
  let lsData = JSON.parse(localStorage.getItem("products"));
  const urlForPost = "http://localhost:3000/api/cameras/order";

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
      listingProduct.style.display = "none";
      priceTotal.innerText = "";
      numberBasket(); // pour reset le 0 dans le panier en même temps
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
    } else if (isNaN(inputPostalCode.value)) {
      alert("Le code postal doit comporter que des chiffres");
    } else if (isNaN(inputPhoneNumber.value)) {
      alert("Le numéro de téléphone doit comporter que des chiffres");
    } else {
      // Si le formulaire est valide on crée un tableu json des commandes et un order avec les value du formulaire clien + le tableau

      console.log("le btn marche"); // pour check si on est bien dans le else

      let lsDataId = lsData.map((val) => val._id);

      const order = {
        contact: {
          firstName: inputFirstName.value,
          lastName: inputName.value,
          city: inputCity.value,
          address: `${inputAddress.value} ${inputPostalCode.value} `,
          email: inputMail.value,
        },
        products: lsDataId,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json ; charset=utf-8" },
      };

      // Requête Post au back

      fetch(urlForPost, options)
        .then((response) => response.json())
        .then((data) => {
          localStorage.removeItem("products");
          console.log(data);
          localStorage.setItem("orderId", data.orderId);
          document.location.href = "confirm.html"
        })
        .catch((error) => {
          alert("un problème est survenu.");
        });
    }
  });

  // fonction qui actualise l'icone du panier

  numberBasket();

  // fonction qui génére le résumé de la commande

  getOrdered();

  // fonction qui vide le localStorage donc le panier

  cleanBasket();
});
