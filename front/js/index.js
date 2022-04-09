let tableau = [];
let url = 'http://localhost:3000/api/products';
fetch(url)
.then(res => res.json())
.then(tab => {
    console.log(tab);
    tableau = tab;
    let items = document.getElementById('items');
    let template = document.querySelector("#ligne");
    for (let k of tableau){
        let clone = document.importNode(template.content, true);
       clone.querySelector('h3').textContent=k.name;
       clone.querySelector('img').setAttribute('src',k.imageUrl,k.altTxt);
       clone.querySelector('p').textContent=k.description;
       clone.querySelector('a').setAttribute('href','./product.html?id='+ k._id);

        items.append(clone);

    }
})



