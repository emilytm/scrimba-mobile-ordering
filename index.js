import { menuArray } from './menuData.js'

let cart = []

document.addEventListener('DOMContentLoaded', renderMenu(menuArray))
document.addEventListener('click',function(e){
    console.log(e.target.dataset)
    if(e.target.dataset.add){
        console.log("adding: ", e.target)
        addToCart(e.target)
    } 
    else if (e.target.dataset.remove) {
        console.log("removing: ", e.target)
        removeFromCart(e.target)
    }
})

function renderMenu(menuArray) {
    let menuHtml = ""
    const menuList = document.getElementById('menu-list')
    menuList.innerHTML = ""

    menuArray.forEach(function(menuItem) {
        console.log(menuItem.name)
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
                    <input placeholder="0" class="item-quantity item-interaction" id="${menuItem.id}-quantity">
                    <image class="item-interaction quantity-button" src="./images/minus.png" data-remove=${menuItem.id}>
                </section>
            </div>
            <hr>
        `
    })
    menuList.innerHTML = menuHtml    
}

/* 
I noticed that the following two functions (addToCart and removeFromCart) are very similar and I tried to make one function that would replace both where 'add' or 'remove' are passed in as parameters but couldn't figure out how to use that parameter to replace the array method (push or pop) or the data attribute (add or remove). Is there a way to do this?
*/

function addToCart(menuItem){
    let itemToAdd = menuArray.find(item => {
        if(item.id === parseInt(menuItem.dataset.add)){
            return item
        }
    })
    
    cart.push(itemToAdd)
    console.log(cart)

}

function removeFromCart(menuItem){
    let itemToRemove = menuArray.find(item => {
        if(item.id === parseInt(menuItem.dataset.remove)){
            return item
        }
    })
    if (cart.includes(itemToRemove)){
        console.log("at least 1 in cart")
    }
    cart.pop(itemToRemove)
}

