import { menuArray } from './menuData.js'

let cart = []

document.addEventListener('DOMContentLoaded', renderMenu(menuArray))
document.addEventListener('click',function(e){
    console.log(e.target.dataset)
    if(e.target.dataset.add){
        addToCart(e.target)
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
                    <image class="add-button" src="./images/plus.png" data-add=${menuItem.id}>
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
    cart.push(menuArray.filter(item => {
        if(item.id === parseInt(menuItem.dataset.add)){
            return item
        }
    }))
}

function removeFromCart(menuItem){
    cart.pop(menuArray.filter(item => {
        if(item.id === parseInt(menuItem.dataset.remove)){
            return item
        }
    }))
}
