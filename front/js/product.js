
let paramsString = window.location.search;
let searchParams = new URLSearchParams(paramsString); //on créé un objet qui permet d'extraire les valeurs des paramètres
let id= searchParams.get('id');
let url = 'http://localhost:3000/api/products/' + id; //on recupere l'url avec l'id du produit cible 

const image = document.querySelector('.item__img img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

fetch(url) 
.then((res) => res.json())
.then((data) => {          
     
    image.setAttribute('src',data.imageUrl); //affichage des details du produit
    title.textContent = data.name;
    price.textContent = data.price;
    description.textContent = data.description;

    let tabColor = data.colors;//choix des couleurs 
for (let e of tabColor) {

   let option = document.createElement('option'); //<option></option>
   option.textContent = e; //<option>couleur</option>
   option.setAttribute('value',e); //<option value="couleur">couleur</option>
   colors.appendChild(option);

};
    
})



