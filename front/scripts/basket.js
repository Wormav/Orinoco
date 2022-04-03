document.addEventListener("DOMContentLoaded", function () {
  // recupère les produit dans le LS puis les transforme en obj

  const arrayProducts = JSON.parse(localStorage.getItem("products"));
  const listingProduct = document.getElementById("listingProduct");
  const priceTotal = document.getElementById("total");

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

    for (let i = 0; i < arrayProducts.length; i++) {
      total += arrayProducts[i].price;
    }

    priceTotal.innerText = total + " €";
  }

  // fonction qui actualise l'icone du panier

  numberBasket();

  // fonction qui génére le résumé de la commande

  getOrdered();
});
