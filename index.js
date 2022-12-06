import { menuArray } from './menuData.js'

let cart = []
let orderTotal = 0
const ccForm = document.getElementById('cc-form')
document.addEventListener('DOMContentLoaded', renderMenu(menuArray))


document.addEventListener('click',function(e){

    //Add to cart
    if(e.target.dataset.add){
        console.log("adding: ", e.target," to cart")
        addToCart(e.target)
    } 
    //Remove from cart
    else if (e.target.dataset.remove) {
        console.log("removing: ", e.target," from cart")
        removeFromCart(e.target)
    }
    //Complete order
    else if (e.target.dataset.order) {
        if(cart.length != 0){
            document.getElementById('payment-modal-el').classList.remove('hidden')
        }
    }
    //Cancel order
    else if (e.target.dataset.cancel) {
        ccForm.reset()
        document.getElementById('payment-modal-el').classList.add('hidden')
    }
})


function renderMenu(menuArray) {
    
    //Clear existing menu
    const menuList = document.getElementById('menu-list')
    menuList.innerHTML = ""

    let menuHtml = ""

    //Iterate through menu to generate HTML for list of menu items
    menuArray.forEach(function(menuItem) {
        console.log("rendering menu item ",menuItem.name," in menu list")
        menuHtml += `
            <div class="menu-item">
                <p class="item-emoji">${menuItem.emoji}</p>
                <section class="item-details">
                    <p class="item-name">${menuItem.name}</p>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
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
    //Display list of menu items
    menuList.innerHTML = menuHtml    
}


function addToCart(menuItem){

    //Update the quantity displayed on the menu item
    updateQuantityElement(menuItem.dataset.add+'-quantity','add')

    //Get the item from the menu data that is to be added
    let itemToAdd = menuArray.find(item => {
        if(item.id === parseInt(menuItem.dataset.add)){
            return item
        }
    })
    
    //Add that item to the cart, increase the total price, and update cart display
    cart.push(itemToAdd)
    orderTotal += itemToAdd.price
    renderCart()
}


function removeFromCart(menuItem){

    let itemId = parseInt(menuItem.dataset.remove)
    let removed = false

    //If this function hasn't returned a match yet, get matching object from array
    function removeValue(value, index, arr) {
        if(value.id === itemId && removed === false) {
            arr.splice(index,1)
            removed = true
            return true
        }
        return false
    }

    //Find matching object in menu array
    let itemToRemove = menuArray.find(item => {
        if(item.id === itemId){
            return item
        }
    })

    //If the item to be removed is actually in the cart, remove it, update quantity display, and update total price
    if (cart.includes(itemToRemove)){
        cart.filter(removeValue)
        updateQuantityElement(menuItem.dataset.remove+'-quantity','remove')
        orderTotal -= itemToRemove.price
    }

    //Update the cart display to reflect the change, if there was one
    renderCart()
}


//This function updates the quantity shown on the menu item in the list
function updateQuantityElement(elementId,action){

    let quantityEl = document.getElementById(elementId)
    let currentQuantity = parseInt(quantityEl.textContent)
    
    //If an item is being added, increment. If not, decrement.
    if (action === 'add') {
        currentQuantity++
    } else {
        currentQuantity--
    }
    quantityEl.textContent = currentQuantity
}


function renderCart() {
    
    let cartHtml = ""
    
    //Clear existing cart
    const cartList = document.getElementById('order-items-list')
    cartList.innerHTML = ""

    //Iterate through cart to generate HTML for list of items in cart
    cart.forEach(function(orderItem) {
        cartHtml += `
            <div class="order-item">
                <div class="order-item-details">
                    <p class="order-item-name detail">${orderItem.name}</p>
                    <p class="order-item-remove detail" data-remove="${orderItem.id}">remove</p>
                </div>
                <p class="order-item-price order-item-details">$${orderItem.price}</p>
            </div>
            <hr>
        `
    })

    //Update actual cart to render cart list HTML
    cartList.innerHTML = cartHtml 
    
    //Update order total to reflect current sum of items in cart
    document.getElementById('order-total-price').textContent = `$${orderTotal}`
    
    //If there is 1 or more items in the cart, show it. Otherwise, hide it.
    if(cart.length === 0) {
        document.getElementById('cart-area').classList.add('hidden')
    } else {
        document.getElementById('cart-area').classList.remove('hidden')
    }
}


ccForm.addEventListener('submit',function(e){
    
    e.preventDefault()

    const ccFormData = new FormData(ccForm)
    const orderName = ccFormData.get('ccname')
    
    //Reset and hide the payment modal after the form is submitted
    document.getElementById('payment-modal-el').classList.add('hidden')
    ccForm.reset()
    
    //Display the right name in the success message, then hide after 2.5sec
    document.getElementById('success-message-text').textContent = 
        `Thanks, ${orderName}! Your order is on its way!`
    document.getElementById('success-message').classList.remove('hidden')
    setTimeout(function(){
        document.getElementById('success-message').classList.add('hidden')
    },2500)

    //Clear out information from past order so that a new one can be placed
    let quantityDisplays = document.querySelectorAll('.item-quantity')
    quantityDisplays.forEach(function(foodQuantity){
        foodQuantity.textContent = 0
    })
    orderTotal = 0
    cart = []
    renderCart()
})
