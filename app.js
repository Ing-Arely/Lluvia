/* =========================
   SLIDER
========================= */

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const slider = document.querySelector(".slider");
const sliderList = slider.querySelector(".list");
const thumbnail = document.querySelector(".thumbnail");

const thumbnailItemsIniciales =
    thumbnail.querySelectorAll(".item");

/*
La primera miniatura se manda al final para que
coincida con el funcionamiento visual del slider.
*/
if (thumbnailItemsIniciales.length > 0) {
    thumbnail.appendChild(
        thumbnailItemsIniciales[0]
    );
}

nextBtn.addEventListener("click", () => {
    moveSlider("next");
});

prevBtn.addEventListener("click", () => {
    moveSlider("prev");
});

function moveSlider(direction) {

    const sliderItems =
        sliderList.querySelectorAll(".item");

    const thumbnailItems =
        thumbnail.querySelectorAll(".item");

    if (
        sliderItems.length === 0 ||
        thumbnailItems.length === 0
    ) {
        return;
    }

    if (direction === "next") {

        sliderList.appendChild(
            sliderItems[0]
        );

        thumbnail.appendChild(
            thumbnailItems[0]
        );

        slider.classList.add("next");

    } else {

        sliderList.prepend(
            sliderItems[sliderItems.length - 1]
        );

        thumbnail.prepend(
            thumbnailItems[
                thumbnailItems.length - 1
            ]
        );

        slider.classList.add("prev");
    }

    slider.addEventListener(
        "animationend",
        () => {
            slider.classList.remove("next");
            slider.classList.remove("prev");
        },
        { once: true }
    );
}


/* =========================
   PRODUCTOS
========================= */

const productos = {

    marmoleado: [
        {
            piezas: 4,
            precio: 80
        }
    ],

    brownie: [
        {
            piezas: 4,
            precio: 75
        }
    ],

    tartasuva: [
        {
            piezas: 4,
            precio: 180
        }
    ],

    /*
    conchas: [
        {
            piezas: 2,
            precio: 25
        },
        {
            piezas: 6,
            precio: 65
        },
        {
            piezas: 12,
            precio: 120
        }
    ],
    */

    /*
    canela: [
        {
            piezas: 4,
            precio: 40
        },
        {
            piezas: 8,
            precio: 65
        },
        {
            piezas: 12,
            precio: 89
        }
    ],
    */

    chispas: [
        {
            piezas: 5,
            precio: 40
        }
    ],

    miel: [
        {
            piezas: 5,
            precio: 40
        }
    ]

    /*
    polvorones: [
        {
            piezas: 4,
            precio: 35
        },
        {
            piezas: 6,
            precio: 50
        },
        {
            piezas: 12,
            precio: 85
        }
    ]
    */

};


/* =========================
   IMÁGENES DEL CARRITO
========================= */

const imagenesProductos = {

    marmoleado:
        "assets/img/PanqueeM.png",

    brownie:
        "assets/img/Brownie (2).png",

    tartasuva:
        "assets/img/tartita1.png",

    chispas:
        "assets/img/chisp.png",

    miel:
        "assets/img/sol1.png"

    /*
    conchas:
        "assets/img/conchas.png",

    canela:
        "assets/img/roles.png",

    polvorones:
        "assets/img/polvorones.png"
    */

};


/* =========================
   CANTIDADES Y PRECIOS
========================= */

document
    .querySelectorAll(".slider .list .item")
    .forEach(item => {

        const tipo =
            item.dataset.producto;

        /*
        Si el elemento no tiene data-producto
        o no existe en el objeto productos,
        no continúa.
        */
        if (
            !tipo ||
            !productos[tipo]
        ) {
            return;
        }

        const plus =
            item.querySelector(".plus");

        const minus =
            item.querySelector(".minus");

        const quantityText =
            item.querySelector(".quantity");

        const priceText =
            item.querySelector(".price");

        /*
        Evita errores si algún producto todavía
        no tiene selector, cantidad o precio.
        */
        if (
            !plus ||
            !minus ||
            !quantityText ||
            !priceText
        ) {
            return;
        }

        const paquetes =
            productos[tipo];

        let index = 0;

        function actualizar() {

            quantityText.innerText =
                `${paquetes[index].piezas} pz`;

            priceText.innerText =
                `$${paquetes[index].precio} MXN`;
        }

        actualizar();

        plus.addEventListener(
            "click",
            event => {

                /*
                Evita que el clic interfiera
                con otros eventos del slider.
                */
                event.stopPropagation();

                if (
                    index <
                    paquetes.length - 1
                ) {
                    index++;
                    actualizar();
                }
            }
        );

        minus.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (index > 0) {
                    index--;
                    actualizar();
                }
            }
        );
    });


/* =========================
   CARRITO
========================= */

let carrito = [];

const openCartDesktop =
    document.getElementById(
        "open-cart-desktop"
    );

const openCartMobile =
    document.getElementById(
        "open-cart-mobile"
    );

const cartModal =
    document.getElementById(
        "cart-modal"
    );

const cartItems =
    document.getElementById(
        "cart-items"
    );

const checkoutBtn =
    document.getElementById(
        "checkout-btn"
    );

const deliveryDate =
    document.getElementById(
        "delivery-date"
    );

const deliveryNote =
    document.getElementById(
        "delivery-note"
    );

const closeCartBtn =
    document.querySelector(
        ".close-cart"
    );

const whatsappText =
    document.querySelector(
        ".whatsapp-text"
    );

const cartTotal =
    document.getElementById(
        "cart-total"
    );

const cartCounts =
    document.querySelectorAll(
        ".cart-count"
    );


/* =========================
   BURBUJA DEL CARRITO
========================= */

function actualizarBurbuja() {

    cartCounts.forEach(count => {
        count.innerText =
            carrito.length;
    });
}


/* =========================
   ABRIR / CERRAR CARRITO
========================= */

function abrirCarrito() {

    cartModal.classList.add(
        "active"
    );

    actualizarCarrito();
}

openCartDesktop.addEventListener(
    "click",
    abrirCarrito
);

openCartMobile.addEventListener(
    "click",
    abrirCarrito
);

closeCartBtn.addEventListener(
    "click",
    () => {

        cartModal.classList.remove(
            "active"
        );
    }
);

/*
Cerrar el carrito al hacer clic fuera
de la caja del carrito.
*/
cartModal.addEventListener(
    "click",
    event => {

        if (event.target === cartModal) {

            cartModal.classList.remove(
                "active"
            );
        }
    }
);


/* =========================
   AGREGAR PRODUCTOS
========================= */

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const item =
                    button.closest(".item");

                if (!item) {
                    return;
                }

                const tipo =
                    item.dataset.producto;

                const titleElement =
                    item.querySelector(
                        ".title"
                    );

                const quantityElement =
                    item.querySelector(
                        ".quantity"
                    );

                const priceElement =
                    item.querySelector(
                        ".price"
                    );

                if (
                    !tipo ||
                    !titleElement ||
                    !quantityElement ||
                    !priceElement
                ) {
                    return;
                }

                const nombre =
                    titleElement.innerText;

                const cantidad =
                    quantityElement.innerText;

                const precio =
                    priceElement.innerText;

                const imagen =
                    imagenesProductos[tipo] ||
                    "";

                carrito.push({
                    tipo,
                    nombre,
                    cantidad,
                    precio,
                    imagen
                });

                actualizarBurbuja();
                actualizarCarrito();
            }
        );
    });


/* =========================
   MOSTRAR CARRITO
========================= */

function actualizarCarrito() {

    if (carrito.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <p>
                    Tu canasta está vacía
                </p>

                <img
                    src="assets/img/canastapan.png"
                    class="img-lluvia"
                    alt="Canasta vacía"
                >

            </div>
        `;

        deliveryDate.classList.add(
            "hidden"
        );

        checkoutBtn.classList.add(
            "hidden"
        );

        deliveryNote.classList.add(
            "hidden"
        );

        whatsappText.classList.add(
            "hidden"
        );

        cartTotal.classList.add(
            "hidden"
        );

        return;
    }

    deliveryDate.classList.remove(
        "hidden"
    );

    checkoutBtn.classList.remove(
        "hidden"
    );

    deliveryNote.classList.remove(
        "hidden"
    );

    whatsappText.classList.remove(
        "hidden"
    );

    cartTotal.classList.remove(
        "hidden"
    );

    cartItems.innerHTML = "";

    let total = 0;

    carrito.forEach(
        (producto, index) => {

            const precioNumero =
                parseFloat(
                    producto.precio.replace(
                        /[^0-9.]/g,
                        ""
                    )
                ) || 0;

            total += precioNumero;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <img
                        src="${producto.imagen}"
                        class="cart-img"
                        alt="${producto.nombre}"
                    >

                    <div class="cart-info">

                        <p class="cart-qty">
                            ${producto.nombre}
                        </p>

                        <p class="cart-qty">
                            ${producto.cantidad}
                        </p>

                        <p class="cart-price">
                            ${producto.precio}
                        </p>

                    </div>

                    <button
                        type="button"
                        onclick="eliminarProducto(${index})"
                        aria-label="Eliminar ${producto.nombre}"
                    >
                        X
                    </button>

                </div>
            `;
        }
    );

    cartTotal.innerText =
        `Total: $${total} MXN`;
}


/* =========================
   ELIMINAR PRODUCTO
========================= */

function eliminarProducto(index) {

    if (
        index < 0 ||
        index >= carrito.length
    ) {
        return;
    }

    carrito.splice(index, 1);

    actualizarBurbuja();
    actualizarCarrito();
}


/*
Se coloca en window porque el botón para
eliminar utiliza onclick dentro del HTML
generado dinámicamente.
*/
window.eliminarProducto =
    eliminarProducto;


/* =========================
   WHATSAPP
========================= */

checkoutBtn.addEventListener(
    "click",
    () => {

        if (carrito.length === 0) {

            alert(
                "Agrega productos al carrito"
            );

            return;
        }

        if (deliveryDate.value === "") {

            alert(
                "Selecciona una fecha"
            );

            return;
        }

        let mensaje =
            "Hola, quiero hacer un pedido:\n\n";

        carrito.forEach(producto => {

            mensaje +=
                `• ${producto.nombre}\n`;

            mensaje +=
                `${producto.cantidad}\n`;

            mensaje +=
                `${producto.precio}\n\n`;
        });

        mensaje +=
            `• Fecha de entrega: ${deliveryDate.value}`;

        const numero =
            "525562267011";

        const url =
            `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );
    }
);


/* =========================
   INICIALIZAR
========================= */

actualizarBurbuja();
actualizarCarrito();
