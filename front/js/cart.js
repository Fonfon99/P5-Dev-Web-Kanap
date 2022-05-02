//------------------------------------------FUNCTIONS---------------------------------------------
// on sauvegarde l'objet dans le local storage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
//------------------------------------------------------------------------------------------------
// on recupere les informations du panier
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    for (let p of cart) 
    return JSON.parse(cart);
  }
}
//------------------------------------------------------------------------------------------------
// on enleve un produit du panier
function remove(item) {
  let cart = getCart();
  cart = cart.filter((p) => p._id != item._id);
  saveCart(cart);
}

//------------------------------------------------------------------------------------------------
// on compte le nombre de produits dans le panier
function getNumberProduct() {
  let cart = getCart();
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += parseInt(item.quantity); // transforme chaine de caractere vers nmbr entier
  });
  return totalQuantity;
}
//------------------------------------------------------------------------------------------------
// on calcule le prix total du panier
function getTotalPrice() {
  
  let total = 0;
  for (let item of cart) {
    total += item.quantity * item.price;
  }
  return total;
}
//------------------------------------------------------------------------------------------------
// on recupere les ids des produits contenus dans le panier
function getCartProductsIds(cart) {
  return cart.map((product) => product._id);
}
//------------------------------------------------------------------------------------------------
// creation de l'objet a envoyer au serveur (contact + ID produit)
function bodyRequest() {
  const body = {
    contact: {
      firstName: prenom.value,
      lastName: nom.value,
      address: address.value,
      city: ville.value,
      email: email.value,
    },
    products: getCartProductsIds(cart),
  };
  return body;
}
//------------------------------------------------------------------------------------------------
// on envoi l'objet (contact + ID produit) au serveur avec la methode POST
function sendOrder() {
  const body = bodyRequest();
  console.log(body);
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let id = data.orderId;
      window.location = "confirmation.html?orderid=" + id;
    })
    .catch((err) => alert(err));
}
//------------------------------------------------------------------------------------------------
// on affiche un message d'erreur pour chaque input non ou mal remplis
function errorMessageTest() {
  let test = true;
  if (prenom.value.length == 0) {
    document.getElementById("firstNameErrorMsg").textContent =
      "Veuillez saisir un prenom";
    test = false;
  } else if (regExpNum.test(prenom.value)) {
    document.getElementById("firstNameErrorMsg").textContent =
      "Vous ne pouvez pas saisir de numero";
    test = false;
  } else if (nom.value.length == 0) {
    document.getElementById("lastNameErrorMsg").textContent =
      "Veuillez saisir un nom";
    test = false;
  } else if (regExpNum.test(nom.value)) {
    document.getElementById("lastNameErrorMsg").textContent =
      "Vous ne pouvez pas saisir de numero";
    test = false;
  } else if (address.value.length == 0) {
    document.getElementById("addressErrorMsg").textContent =
      "Veuillez saisir une addresse";
    test = false;
  } else if (ville.value.length == 0) {
    document.getElementById("cityErrorMsg").textContent =
      "Veuillez saisir une ville";
    test = false;
  } else if (regExpNum.test(ville.value)) {
    document.getElementById("cityErrorMsg").textContent =
      "Vous ne pouvez pas saisir de numero";
    test = false;
  } else if (email.value.length == 0) {
    document.getElementById("emailErrorMsg").textContent =
      "Veuillez saisir votre email";
    test = false;
  } else if (regExpEmail.test(email.value) == false) {
    document.getElementById("emailErrorMsg").textContent =
      "Veuillez saisir une addresse email valide";
    test = false;
  }
  return test;
}
//------------------------------------------------------------------------------------------------
//
async function getPrice(id) {
    
    return new Promise((resolve) => {
      let url = "http://localhost:3000/api/products/" + id;
      console.log(id);
      fetch(url)
    .then((res) => res.json())
    .then((data) => {
        
      console.log(data.price);
      resolve(data.price)
    })
    
  });
};


//------------------------------------------------------------------------------------------------


let cart = getCart();
const prenom = document.getElementById("firstName"); // on vise la valeur du champ de saisie en excluant les espaces
const nom = document.getElementById("lastName");
const address = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

const regExpNum = /\d/;
const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.([a-zA-Z]){2,})$/;

async function affiche() {
  const totalPrice = document.getElementById("totalPrice");
  const totalQuantity = document.getElementById("totalQuantity");
  let cartItems = document.getElementById("cart__items");
  cartItems.innerHTML = "";
  let template = document.querySelector("#tpl");
  let i = 0;
  for (let item of cart) {
    // pour chaque produit dans le panier on clone le template
    let price = await getPrice(item._id);
    let clone = document.importNode(template.content, true);
    clone.querySelector("img").setAttribute("src", item.imageUrl, item.altTxt);
    clone.querySelector("h2").textContent = item.name;
    clone.querySelector(".couleur").textContent = item.color;
    clone.querySelector(".prix").textContent = price;
    clone.querySelector(".itemQuantity").value = item.quantity;
    item.price = price;
    

    let deleteItem = clone.querySelector(".deleteItem");
    let article = clone.querySelector("article");

    article.setAttribute("data-indice", i); // on rentre l'indice du tableau en attribut a l'article

    deleteItem.onclick = function () {
      // on creer une fonction au click sur le bouton supprimer
      let indice =
        this.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-indice"
        );
      cart.splice(indice, 1);
      saveCart(cart);
      affiche(); // on reaffiche le panier sans l'element supprime
    };

    let itemQuantity = clone.querySelector("input"); // on vise le champ de saisie de la quantite
    itemQuantity.onchange = function () {
      // on creer une fonction a la saisie d'un nouveau nombre
      let indice =
        this.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-indice"
        );
      cart[indice].quantity = this.value; // on change pour la nouvelle quantite
      saveCart(cart);
      affiche(); // on reaffiche le panier avec la nouvelle quantite
      console.log(this.value);
    };

    cartItems.append(clone);
    i++;
  }

  totalQuantity.textContent = getNumberProduct(); // on affiche le nombre de produits
  totalPrice.textContent = getTotalPrice(); // on affiche le prix total
};

affiche();

document.getElementById("order").onclick = function (e) {
  // on creer une fonction au click sur le bouton commander
  e.preventDefault();
  if (cart.length === 0) {
    alert("Vous n'avez commandé aucun article")
    return;
  };

  document.getElementById("firstNameErrorMsg").textContent = ""; // on vide les messages d'erreurs
  document.getElementById("lastNameErrorMsg").textContent = "";
  document.getElementById("addressErrorMsg").textContent = "";
  document.getElementById("cityErrorMsg").textContent = "";
  document.getElementById("emailErrorMsg").textContent = "";

  // boucle if/else pour afficher les messages d'erreurs en cas de mauvaises saisies
  let test = errorMessageTest();

  if (test) {
    sendOrder();
  };
}
