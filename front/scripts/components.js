// fonction actualisation icone panier

function numberBasket() {
    let arrayProducts = JSON.parse(localStorage.getItem("products"));
    let numberProduct = document.getElementById("numberShop");

    if (arrayProducts === null) {
      numberProduct.style.display = "none";
    } else {
      numberProduct.innerText = arrayProducts.length ;
    }
  }

  