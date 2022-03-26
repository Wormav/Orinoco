const url = "http://localhost:3000/api/cameras";

// appel fetch pour recupéré les données de l'API

async function getAway() {
  const request = await fetch(url, {
    method: "GET",
  });
  if (!request.ok) {
    alert("Un problème est survenu.");
  } else {
    let data = await request.json();
    console.log(data);
  }
}

getAway();

