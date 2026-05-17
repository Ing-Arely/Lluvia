let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.list')
let thumbnail = document.querySelector('.thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

// NEXT
nextBtn.onclick = function () {
    moveSlider('next')
}

// PREV
prevBtn.onclick = function () {
    moveSlider('prev')
}

function moveSlider(direction) {

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
        { piezas: 2, precio: 65 },
        { piezas: 4, precio: 125 },
        { piezas: 10, precio: 310 }
    ],

    brownie: [
        { piezas: 2, precio: 60 },
        { piezas: 4, precio: 115 },
        { piezas: 6, precio: 170 },
        { piezas: 8, precio: 220 }
    ],

    conchas: [
        { piezas: 2, precio: 45 },
        { piezas: 6, precio: 120 },
        { piezas: 12, precio: 205 }
    ],

    canela: [
        { piezas: 4, precio: 80 },
        { piezas: 8, precio: 155 },
        { piezas: 12, precio: 230 }
    ],

    chispas: [
        { piezas: 5, precio: 60 },
        { piezas: 10, precio: 120 },
        { piezas: 20, precio: 235 },
        { piezas: 30, precio: 345 }
    ],

    miel: [
        { piezas: 5, precio: 60 },
        { piezas: 10, precio: 120 },
        { piezas: 20, precio: 235 },
        { piezas: 30, precio: 345 }
    ]
}

/* =========================
   BOTONES + Y -
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

        quantityText.innerText =
            `${paquetes[index].piezas} pz`

        priceText.innerText =
            `$${paquetes[index].precio} MXN`
    }

    actualizar()

    // BOTÓN +
    plus.addEventListener('click', () => {

        if(index < paquetes.length - 1){

            index++
            actualizar()
        }
    })

    // BOTÓN -
    minus.addEventListener('click', () => {

        if(index > 0){

            index--
            actualizar()
        }
    })
})
