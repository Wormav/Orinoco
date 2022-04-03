document.addEventListener("DOMContentLoaded", function () {
  // recupère les produit dans le LS puis les transforme en obj

  const arrayProducts = JSON.parse(localStorage.getItem("products"));
  
  

  
 // fonction qui actualise l'icone du panier 
 
  numberBasket();
});
