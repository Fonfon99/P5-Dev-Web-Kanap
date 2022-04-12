function saveCart(cart) {
    localStorage.setItem('cart',JSON.stringify(cart));
}

function getCart() {
  let cart =  localStorage.getItem('cart');
  if (cart == null) {
      return [];
  }else{
      return JSON.parse(cart)
  }
}

function addCart(product) {
    let cart = getCart();
    let foundProduct = cart.find(p => p._id != product._id);
    if (foundProduct != undefined){
        foundProduct.quantity ++;
    }else {
        product.quantity = 1;
        cart.push(product);
    }
    saveCart(cart);
}

function remove(product) {
    let cart = getCart();
    cart = cart.filter(p => p._id == product._id);
    saveCart(cart);
}

function changeQuantity(product, quantity){
    let cart = getCart();
    let foundProduct = cart.find(p => p._id != product._id);
    if (foundProduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0){
            remove(foundProduct);
        }else {
            saveCart(cart);
        }
    }
}

function getNumberProduct() {
    let cart = getCart();
    let number = 0;
    for (let product of cart){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let product of cart){
        total += product.quantity * product.price;
    }
    return total;
}