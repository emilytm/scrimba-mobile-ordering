import { menuArray } from './menuData.js'

document.addEventListener('DOMContentLoaded', renderMenu(menuArray))

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
                    <image class="add-button" src="./images/plus.png">
                </section>
            </div>
            <hr>
        `
    })
    menuList.innerHTML = menuHtml    
}

//renderMenu(menuArray)