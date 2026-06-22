/* =========================
   SLIDER
========================= */

let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.list')
let thumbnail = document.querySelector('.thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

nextBtn.onclick = function () {
    moveSlider('next')
}

prevBtn.onclick = function () {
    moveSlider('prev')
}

function moveSlider(direction){

    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = thumbnail.querySelectorAll('.item')

    if(direction === 'next'){
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }

    slider.addEventListener('animationend', function(){
        slider.classList.remove('next')
        slider.classList.remove('prev')
    }, { once: true })
}


/* =========================
   PRODUCTOS
========================= */

const productos = {
    marmoleado: [
        { piezas: 2, precio: 45 },
        { piezas: 4, precio: 75 },
        { piezas: 10, precio: 89 }
    ],
    brownie: [
        { piezas: 2, precio: 40 },
        { piezas: 4, precio: 60 },
        { piezas: 6, precio: 80 },
        { piezas: 8, precio: 99 }
    ],
    conchas: [
        { piezas: 2, precio: 20 },
        { piezas: 6, precio: 50 },
        { piezas: 12, precio: 80 }
    ],
    canela: [
        { piezas: 4, precio: 40 },
        { piezas: 8, precio: 65 },
        { piezas: 12, precio: 89 }
    ],
    chispas: [
        { piezas: 5, precio: 30 },
        { piezas: 10, precio: 50 },
        { piezas: 15, precio:70 }
    ],
    miel: [
        { piezas: 5, precio: 30 },
        { piezas: 10, precio: 50 },
        { piezas: 15, precio:70 }
    ],
    polvorones: [
        { piezas: 4, precio: 30 },
        { piezas: 6, precio: 40 },
        { piezas: 12, precio: 70 }
    ]
}

/* =========================
   CANTIDADES Y PRECIOS
========================= */

document.querySelectorAll('.slider .list .item').forEach(item => {

    let tipo = item.dataset.producto
    if(!tipo || !productos[tipo]) return

    let plus = item.querySelector('.plus')
    let minus = item.querySelector('.minus')
    let quantityText = item.querySelector('.quantity')
    let priceText = item.querySelector('.price')

    let paquetes = productos[tipo]
    let index = 0

    function actualizar(){
        quantityText.innerText = `${paquetes[index].piezas} pz`
        priceText.innerText = `$${paquetes[index].precio} MXN`
    }

    actualizar()

    plus.addEventListener('click', () => {
        if(index < paquetes.length - 1){
            index++
            actualizar()
        }
    })

    minus.addEventListener('click', () => {
        if(index > 0){
            index--
            actualizar()
        }
    })
})


/* =========================
   CARRITO
========================= */

let carrito = []
const openCartDesktop = document.getElementById('open-cart-desktop')
const openCartMobile = document.getElementById('open-cart-mobile')
const cartModal = document.getElementById('cart-modal')
const cartItems = document.getElementById('cart-items')
const checkoutBtn = document.getElementById('checkout-btn')
const deliveryDate = document.getElementById('delivery-date')
const deliveryNote = document.getElementById('delivery-note')
const closeCartBtn = document.querySelector('.close-cart')
const whatsappText = document.querySelector('.whatsapp-text')
const cartTotal = document.getElementById('cart-total')
const cartCounts = document.querySelectorAll('.cart-count')

function actualizarBurbuja(){

    cartCounts.forEach(count => {
        count.innerText = carrito.length
    })

}
/* =========================
   ABRIR / CERRAR CARRITO
========================= */

function abrirCarrito(){

    cartModal.classList.add('active')
    actualizarCarrito()
}

openCartDesktop.addEventListener('click', abrirCarrito)
openCartMobile.addEventListener('click', abrirCarrito)

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active')
})


/* =========================
   AGREGAR PRODUCTOS
========================= */

document.querySelectorAll('.add-cart').forEach(button => {

    button.addEventListener('click', () => {

        const item = button.closest('.item')

        const tipo = item.dataset.producto
        const nombre = item.querySelector('.title').innerText
        const cantidad = item.querySelector('.quantity').innerText
        const precio = item.querySelector('.price').innerText

        let imagen = ""

        if(tipo === "marmoleado") imagen = "assets/img/PanqueeM.png"
        if(tipo === "brownie") imagen = "assets/img/Brownie (2).png"
        if(tipo === "conchas") imagen = "assets/img/conchaas.png"
        if(tipo === "canela") imagen = "assets/img/canela.png"
        if(tipo === "chispas") imagen = "assets/img/chisp.png"
        if(tipo === "miel") imagen = "assets/img/sol1.png"
        if(tipo === "polvorones") imagen = "assets/img/polvoron.png"

        carrito.push({
            nombre,
            cantidad,
            precio,
            imagen
        })
        actualizarBurbuja()
        actualizarCarrito()
    })
})


/* =========================
   MOSTRAR CARRITO
========================= */

function actualizarCarrito(){

    if(carrito.length === 0){

        cartItems.innerHTML = `
            <div class="empty-cart">
                Tu canasta está vacía
                <img 
      src="assets/img/canastapan.png"
class="img-lluvia"class="hidden"
      alt=""> 
            </div>
        `


        deliveryDate.classList.add('hidden')
        checkoutBtn.classList.add('hidden')
        deliveryNote.classList.add('hidden')
        whatsappText.classList.add('hidden')
        cartTotal.classList.add('hidden')

        return
    }

    deliveryDate.classList.remove('hidden')
    checkoutBtn.classList.remove('hidden')
    deliveryNote.classList.remove('hidden')
    whatsappText.classList.remove('hidden')
    cartTotal.classList.remove('hidden')

    cartItems.innerHTML = ""

    let total = 0

    carrito.forEach((producto, index) => {

        let precioNumero = parseFloat(
            producto.precio.replace(/[^0-9.]/g, "")
        )

        total += precioNumero

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${producto.imagen}" class="cart-img">

                <div class="cart-info">

                    <p class="cart-qty">
                        ${producto.cantidad}
                    </p>

                    <p class="cart-price">
                        ${producto.precio}
                    </p>

                </div>

                <button onclick="eliminarProducto(${index})">
                    X
                </button>

            </div>
        `
    })

cartTotal.innerText = `Total: $${total} MXN`
}

/* =========================
   ELIMINAR
========================= */

function eliminarProducto(index){

    carrito.splice(index, 1)

    actualizarBurbuja()
    actualizarCarrito()
}


/* =========================
   WHATSAPP
========================= */

checkoutBtn.addEventListener('click', () => {

    if(carrito.length === 0){
        alert("Agrega productos al carrito")
        return
    }

    if(deliveryDate.value === ""){
        alert("Selecciona una fecha")
        return
    }

    let mensaje = `Hola, quiero hacer un pedido:%0A%0A`

    carrito.forEach(producto => {
        mensaje += `• ${producto.nombre}%0A${producto.cantidad}%0A${producto.precio}%0A%0A`
    })

    mensaje += `• Fecha de entrega: ${deliveryDate.value}`

    const numero = "5214427127083"

    const url = `https://wa.me/${numero}?text=${mensaje}`

    window.open(url, '_blank')
})


/* =========================
   INICIALIZAR
========================= */
actualizarBurbuja()
actualizarCarrito()
