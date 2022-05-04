//------------------------------------------FUNCTIONS---------------------------------------------
// on sauvegarde l'objet dans le local storage 
function saveCart(cart) {  
    localStorage.setItem('cart',JSON.stringify(cart));
}
//---------------------------------------------------------------------------------
// on recupere les informations du panier
function getCart() { 
  let cart =  localStorage.getItem('cart');
  if (cart == null) {
      return [];
  }else{
      return JSON.parse(cart)
  }
}
//---------------------------------------------------------------------------------
// on ajoute un ou plusieurs produit(s) dans le panier
function addCart(item) {  
    let cart = getCart();
    let foundProduct = false; 
    if (foundProduct._id == item._id){
        foundProduct.quantity + item.quantity;
    }else {
        cart.push(item);
        saveCart(cart);
    }
    
}
//---------------------------------------------------------------------------------

let paramsString = window.location.search;
let searchParams = new URLSearchParams(paramsString); // on créé un objet qui permet d'extraire les valeurs des paramètres
let id= searchParams.get('id');
let url = 'http://localhost:3000/api/products/' + id; // on recupere l'url avec l'id du produit cible 

const image = document.querySelector('.item__img img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
let product = {} ;
                                           

fetch(url)            
.then(res => res.json())
.then(data => {          
    product = data;
    image.setAttribute('src',data.imageUrl); // affichage des details du produit
    title.textContent = data.name;
    price.textContent = data.price;
    description.textContent = data.description;

    let tabColor = data.colors; // choix des couleurs 

for (let e of tabColor) {

   let option = document.createElement('option'); // <option></option>
   option.textContent = e; // <option>couleur</option>
   option.setAttribute('value',e); // <option value="couleur">couleur</option>
   colors.appendChild(option);
}
});

const btn = document.getElementById('addToCart');
btn.onclick = function() { // ajout du produit dans le panier au click 
    let item = {};
    item._id = product._id;
    item.name = product.name;
    item.imageUrl = product.imageUrl;
    item.quantity = document.getElementById('quantity').value;
    item.color = document.getElementById('colors').value;
    
    addCart(item);
window.location = 'cart.html';  // redirection du client vers la page panier
}

    





