import { menuArray } from './menuData.js'

let cart = []

document.addEventListener('DOMContentLoaded', renderMenu(menuArray))
document.addEventListener('click',function(e){
    console.log(e.target.dataset)
    if(e.target.dataset.add){
        console.log("adding: ", e.target," to cart")
        addToCart(e.target)
    } 
    else if (e.target.dataset.remove) {
        console.log("removing: ", e.target," from cart")
        removeFromCart(e.target)
    } 

})

function renderMenu(menuArray) {
    let menuHtml = ""
    const menuList = document.getElementById('menu-list')
    menuList.innerHTML = ""

    menuArray.forEach(function(menuItem) {
        console.log("rendering menu item ",menuItem.name," in menu list")
        menuHtml += `
            <div class="menu-item">
                <p class="item-emoji">${menuItem.emoji}</p>
                <section class="item-details">
                    <p class="item-name">${menuItem.name}</p>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">${menuItem.price}</p>
                </section>
                <section class="item-interactions">
                    <image class="item-interaction quantity-button" src="./images/plus.png" data-add=${menuItem.id}>
                    <p class="item-quantity item-interaction" id="${menuItem.id}-quantity">0</p>
                    <image class="item-interaction quantity-button" src="./images/minus.png" data-remove=${menuItem.id}>
                </section>
            </div>
            <hr>
        `
    })
    menuList.innerHTML = menuHtml    
}

function addToCart(menuItem){
    updateQuantityElement(menuItem.dataset.add+'-quantity','add')
    let itemToAdd = menuArray.find(item => {
        if(item.id === parseInt(menuItem.dataset.add)){
            return item
        }
    })
    let newCartItem = {
        'name': itemToAdd.name,
        'price': itemToAdd.price,
        'id': itemToAdd.id
    }
    cart.push(itemToAdd)
    document.getElementById(menuItem.dataset.add+'-quantity').value++
    renderCart()
}

function removeFromCart(menuItem){
    let itemId = parseInt(menuItem.dataset.remove)
    let removed = false

    function removeValue(value, index, arr) {
        if(value.id === itemId && removed === false) {
            arr.splice(index,1)
            removed = true
            return true
        }
        return false
    }

    let itemToRemove = menuArray.find(item => {
        if(item.id === itemId){
            return item
        }
    })
    if (cart.includes(itemToRemove)){
        cart.filter(removeValue)
        updateQuantityElement(menuItem.dataset.remove+'-quantity','remove')
    }
    renderCart()
}

function updateQuantityElement(elementId,action){
    let quantityEl = document.getElementById(elementId)
    let currentQuantity = parseInt(quantityEl.textContent)
    if (action === 'add') {
        currentQuantity++
    } else {
        currentQuantity--
    }
    quantityEl.textContent = currentQuantity
}


function renderCart() {
    let cartHtml = ""
    const cartList = document.getElementById('order-items-list')
    cartList.innerHTML = ""

    cart.forEach(function(orderItem) {
        console.log('DISPLAY CART ITEM: ',orderItem.name)
        cartHtml += `
            <div class="order-item">
                <div class="order-item-details">
                    <p class="order-item-name detail">${orderItem.name}</p>
                    <p class="order-item-remove detail" data-remove="${orderItem.id}">remove</p>
                </div>
                <p class="order-item-price order-item-details">${orderItem.price}</p>
            </div>
            <hr>
        `
    })
    cartList.innerHTML = cartHtml 
    if(cart.length === 0) {
        document.getElementById('cart-area').classList.add('hidden')
    } else {
        document.getElementById('cart-area').classList.remove('hidden')
    }
}