let tableau = [];
let url = "http://localhost:3000/api/products";
fetch(url) // on recupere les produits dans l'api
  .then((res) => res.json())
  .then((tab) => {
    tableau = tab;
    let items = document.getElementById("items");
    let template = document.querySelector("#ligne");
    for (let k of tableau) {
      // pour chaque produits on clone le template puis on affiche
      let clone = document.importNode(template.content, true);
      clone.querySelector("h3").textContent = k.name;
      clone.querySelector("img").setAttribute("src", k.imageUrl, k.altTxt);
      clone.querySelector("p").textContent = k.description;
      clone
        .querySelector("a")
        .setAttribute("href", "./product.html?id=" + k._id);

      items.append(clone);
    }
  });
