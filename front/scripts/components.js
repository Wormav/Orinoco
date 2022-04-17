// fonction actualisation icone panier

function numberBasket() {
    let arrayProducts = JSON.parse(localStorage.getItem("products"));
    let numberProduct = document.getElementById("numberShop");

    if (arrayProducts === null) {
      numberProduct.innerText = "0";
    } else {
      numberProduct.innerText = arrayProducts.length ;
    }
  }

  