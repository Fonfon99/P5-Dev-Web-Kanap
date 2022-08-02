const orderId = document.getElementById("orderId");
let id = window.location.search.split("=")[1];

orderId.textContent = id;

window.localStorage.clear();
