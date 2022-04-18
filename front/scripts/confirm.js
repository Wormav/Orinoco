document.addEventListener("DOMContentLoaded", function () {
  let confirmText = document.getElementById("confirmText");

  // si un orderId dans le LS
  if (localStorage.getItem("orderId") !== null) {
    confirmText.innerText = `Votre commande numéro : ${localStorage.getItem(
      "orderId"
    )} à bien était reçu, un mail de confirmation vous à était envoyé`;
    confirmText.style.fontSize = "20px";

    // si non
  } else {
    confirmText.innerText = "retourner au magasin";
  }

  // efface l'oderId du LS quand l'utilisateur quitte la page
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("orderId");
  });
});
