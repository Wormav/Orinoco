document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:3000/api/cameras";

  const container = document.querySelector("#cardContain");

  // appel fetch pour recupéré les données de l'API

  function getItems() {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .catch((error) => {
        alert("un problème est survenu.");
      })

      .then(function (returnAPI) {
        const items = returnAPI;
        // console.log(items);
        for (let item in items) {
          // container de la carte
          let itemCardBlock = document.createElement("div");
          container.appendChild(itemCardBlock);
          itemCardBlock.classList.add("col-lg-4", "col-md-6", "px-5");

          // carte
          let itemCard = document.createElement("div");
          itemCardBlock.appendChild(itemCard);
          itemCard.classList.add("card", "m-3");

          //img de la carte
          let itemImg = document.createElement("img");
          itemCard.appendChild(itemImg);
          itemImg.classList.add("card-img-top");
          itemImg.src = returnAPI[item].imageUrl;

          //body de la carte
          let itemBody = document.createElement("div");
          itemCard.appendChild(itemBody);
          itemBody.classList.add("card-body", "bg-primaryP");
          itemBody.style.minHeight = "130px";

          // titre produit
          let itemTitle = document.createElement("h5");
          itemBody.appendChild(itemTitle);
          itemTitle.classList.add("text-center", "titleShop");
          itemTitle.style.fontWeight = "bolder";
          itemTitle.innerText = returnAPI[item].name;

          // description du produit
          let itemDescription = document.createElement("p");
          itemBody.appendChild(itemDescription);
          itemDescription.classList.add("text-center");
          itemDescription.innerText = returnAPI[item].description;

          // prix du produit
          let itemPrice = document.createElement("p");
          itemBody.appendChild(itemPrice);
          itemPrice.classList.add("text-center");
          itemPrice.style.fontWeight = "bolder";

          // passage du prix en euro

          itemPrice.innerHTML = returnAPI[item].price / 100 + " €";

          // footer de la carte
          let itemFooter = document.createElement("div");
          itemCard.appendChild(itemFooter);
          itemFooter.classList.add("card-footer", "bg-dark");

          // button achter
          let cardBtn = document.createElement("a");
          itemFooter.appendChild(cardBtn);
          cardBtn.classList.add(
            "btn",
            "w-100",
            "text-secondaryP",
            "border",
            "border-secondaryP",
            "btn-outline-secondary",
            "btnCard"
          );
          cardBtn.href = `product.html?id=${returnAPI[item]._id}`;
          cardBtn.innerText = "Afficher le produit";
        }
      });
  }

  numberBasket();

  getItems();
});
