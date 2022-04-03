document.addEventListener("DOMContentLoaded", function () {
  // recupère les produit dans le LS puis les transforme en obj

  const arrayProducts = JSON.parse(localStorage.getItem("products"));
  const procductsNumber = arrayProducts.length;

  // MAJ nombre d'article dans l'icone panier 

  function numberBasket() {
    let number = document.getElementById("numberShop");
    if (procductsNumber === 0)
     {
      number.style.display = "none";
    } else {
      number.innerText = procductsNumber;
    }
  }


  

  numberBasket();

  console.log(procductsNumber);
  console.table(arrayProducts);
});
