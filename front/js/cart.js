function saveCart(cart) {
  // on sauvegarde l'objet dans le local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}
//------------------------------------------------------------------------------------------------

function getCart() {
  // on recupere les informations du panier
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
//------------------------------------------------------------------------------------------------

function remove(item) {
  // on enleve un produit du panier
  let cart = getCart();
  cart = cart.filter((p) => p._id != item._id);
  saveCart(cart);
}

//------------------------------------------------------------------------------------------------

function getNumberProduct() {
  // on compte le nombre de produits dans le panier
  let cart = getCart();
  let number = 0;
  for (let item of cart) {
    number = item.quantity;
  }
  return number;
}
//------------------------------------------------------------------------------------------------

function getTotalPrice() {
  // on calcule le prix total du panier
  let cart = getCart();
  let total = 0;
  for (let item of cart) {
    total += item.quantity * item.price;
  }
  return total;
}
//------------------------------------------------------------------------------------------------
function affiche() {
  const totalPrice = document.getElementById("totalPrice");
  const totalQuantity = document.getElementById("totalQuantity");

  let cart = getCart();
  let cartItems = document.getElementById("cart__items");
  cartItems.innerHTML = "";
  let template = document.querySelector("#tpl");
  let i = 0;
  for (let item of cart) {
    // pour chaque produit dans le panier on clone le template
    let clone = document.importNode(template.content, true);
    clone.querySelector("img").setAttribute("src", item.imageUrl, item.altTxt);
    clone.querySelector("h2").textContent = item.name;
    clone.querySelector(".couleur").textContent = item.color;
    clone.querySelector(".prix").textContent = item.price;
    clone.querySelector(".itemQuantity").value = item.quantity;

    let deleteItem = clone.querySelector(".deleteItem");
    let article = clone.querySelector("article");

    article.setAttribute("data-indice", i);  // on rentre l'indice du tableau en attribut a l'article
   
    deleteItem.onclick = function () { // on creer une fonction au click sur le bouton supprimer 
      let indice =
        this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-indice");;
      cart.splice(indice, 1);
      saveCart(cart);
      affiche(); // on reaffiche le panier sans l'element supprime 
    };

    let itemQuantity = clone.querySelector("input"); // on vise le champ de saisie de la quantite 
    itemQuantity.onchange = function () { // on creer une fonction a la saisie d'un nouveau nombre
      let indice =
        this.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-indice"
        );
      cart[indice].quantity = this.value; // on change pour la nouvelle quantite 
      saveCart(cart);
      affiche();  // on reaffiche le panier avec la nouvelle quantite 
      console.log(this.value);
    };

    cartItems.append(clone); 
    i++;
  }

  totalQuantity.textContent = getNumberProduct(); // on affiche le nombre de produits  
  totalPrice.textContent = getTotalPrice(); // on affiche le prix total 
}

affiche();
