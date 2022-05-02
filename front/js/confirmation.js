const orderId = document.getElementById('orderId');
let id = window.location.search.split("=")[1]
console.log(id);

orderId.textContent = id;

window.localStorage.clear();

