import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'


let orderList = []

const orderSection = document.getElementById('order-section')
const paymentForm = document.getElementById('payment-form')

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
        console.log('yes')
        closeModal()
    } else if (e.target.id === 'pay-btn') {
        const form = document.getElementById('payment-form')
        if (form.checkValidity()) {
            e.preventDefault()
            closeModal()
            hideOrder()
            showConfirmation()
            resetOrder()
            setTimeout(() => {
                hideConfirmation()
            }, 3000);
        }
    }
})


function handleAddProduct(productId) {
    const existingProduct = orderList.find(item => item.id === productId)

    if (existingProduct) {
        existingProduct.amount += 1
    } else {
        menuArray.forEach((product) => {
            if(productId === product.id) {
                orderList.push({
                    name: product.name,
                    price: product.price,
                    uuid: uuidv4(),
                    amount: 1,
                    id: productId
                })   
            }
        })
    }
    console.log(orderList)
    renderOrder()
}


function handleRemoveProduct(productId){
    for (let i = 0; i < orderList.length; i++){
        if (orderList[i].uuid === productId) {
            orderList.splice(i, 1)
        }
    }  
renderOrder()
}


function getTotalOrderPrice(){
    const totPrice = orderList.reduce(function(total, current){
    return total + (current.price * current.amount)
},0)
const totalPrice = document.getElementById('total-price').innerText = '$' + totPrice
}

const showOrder = () => orderSection.classList.remove("hidden")

const hideOrder = () => orderSection.classList.add("hidden")

const resetOrder = () => {
    orderList = []
    paymentForm.reset()
}


const renderOrder = () => {
    if (orderList.length > 0){
        getTotalOrderPrice()
        showOrder()
        
        const orderRecapEl = document.getElementById('order-recap')    
        let renderOrder = ''
    
        orderList.forEach((product) => {
            if (product.amount > 1) {
                console.log ('amount show')
                renderOrder += `
                <div class="recap-product">
                    <h2>${product.name}</h2>
                    <h2 class="prod-quantity">(x${product.amount})</h2>
                    <p data-remove="${product.uuid}">remove</p>
                    <h3 class="recap-price">$${product.price * product.amount}</h3>
                </div>
                `
            } else {
                renderOrder += `
                <div class="recap-product">
                    <h2>${product.name}</h2>
                    <p data-remove="${product.uuid}">remove</p>
                    <h3 class="recap-price">$${product.price}</h3>
                </div>
                `
            }
        })
        return orderRecapEl.innerHTML = renderOrder
    } else {
        hideOrder()
    }
}


// Payment & Confirmation Section

const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const confirmationMessage = document.querySelector(".confirmation-message")

const openModal = () => {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

const closeModal = () => {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
  })


const hideConfirmation = () => confirmationMessage.classList.add("hidden")

const showConfirmation = () => confirmationMessage.classList.remove("hidden")