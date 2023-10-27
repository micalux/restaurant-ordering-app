import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'


let orderList = []
let totPrice = ''

const orderSection = document.getElementById('order-section')
const orderBtn = document.getElementById('order-btn')
const payBtn = document.getElementById('pay-btn')

const renderMenu = () => {
    const menuEl = document.getElementById('menu')
    let renderMenu = ''
    menuArray.forEach(product => {
        renderMenu += `
        <div class="product">
            <div class="product-img">
                <p>${product.emoji}</p>
            </div>
            <div class="product-details">
                <h2>${product.name}</h2>
                <h4>pepperoni, mushrom, mozarella</h4>
                <h3>$${product.price}</h3>
            </div>
            <div class="plus-icon">
                <i class="fa-solid fa-plus" data-plus="${product.id}"></i>
            </div>
        </div>
        `
    })
    return menuEl.innerHTML = renderMenu
}

renderMenu()

document.addEventListener('click', function(e) {
    if (e.target.dataset.plus) {
        handleAddProduct(parseInt(e.target.dataset.plus))     
    } else if (e.target.dataset.remove) {
        handleRemoveProduct((e.target.dataset.remove))   
    } else if (e.target.id === 'order-btn') {
        openModal()
    } else if (e.target.id === 'close-btn') {
        closeModal()
    } else if (e.target.id === 'pay-btn') {
        console.log('yes')
    }
})

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
  })

function handleAddProduct(productId) {
    menuArray.forEach((product) => {
        if(productId === product.id) {
            orderList.push({
                name: product.name,
                price: product.price,
                uuid: uuidv4()
            })          
        }
    })
    renderOrder()
}

function handleRemoveProduct(productId){
    for (let i = 0; i < orderList.length; i++){
        if (orderList[i].uuid === productId) {
            orderList.splice(i, 1)
        }
    }  
    console.log(orderList)
renderOrder()
}


function getTotalOrderPrice(){
    totPrice = orderList.reduce(function(total, current){
    return total + current.price
},0)
const totalPrice = document.getElementById('total-price').innerText = '$' + totPrice
}

const renderOrder = () => {
    if (orderList.length > 0){
        getTotalOrderPrice()
        showsOrderRecap()
        
        const orderRecapEl = document.getElementById('order-recap')    
        let renderOrder = ''
    
        orderList.forEach((product) => {
            renderOrder += `
                <div class="recap-product">
                    <h2>${product.name}</h2>
                    <p data-remove="${product.uuid}">remove</p>
                    <h3 class="recap-price">$${product.price}</h3>
                </div>
                `
        })
        return orderRecapEl.innerHTML = renderOrder
    } else {
        orderSection.style.display = 'none'
    }
}

const showsOrderRecap = () => { 
    orderSection.style.display = 'block'
}



// Modal Section

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const openModal = () => {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

const closeModal = () => {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}
