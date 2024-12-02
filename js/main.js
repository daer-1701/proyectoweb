(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });
    
})(jQuery);

// Clase para manejar el carrito
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.renderCart();
    }

    // Método para agregar un producto al carrito
    addToCart(product) {
        const exists = this.cart.find(item => item.nombre === product.nombre);
        if (exists) {
            exists.quantity += 1; // Incrementa la cantidad si ya existe
        } else {
            this.cart.push({ ...product, quantity: 1 }); // Agrega un nuevo producto
        }
        this.saveCart();
    }

    // Método para guardar el carrito en localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCart();
    }

    // Renderiza el contenido del carrito en la página
    renderCart() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        cartContainer.innerHTML = '';
        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px;">
                <span>${item.nombre}</span>
                <span>${item.precio} USD</span>
                <span>Cantidad: ${item.quantity}</span>
            `;
            cartContainer.appendChild(cartItem);
        });

        const totalContainer = document.getElementById('cart-total');
        if (totalContainer) {
            const total = this.cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
            totalContainer.textContent = `Total: $${total.toFixed(2)}`;
        }
    }
}

// Inicializa el carrito
const cart = new ShoppingCart();

// Añade eventos a los botones
document.querySelectorAll('button[classnombre]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado
        const product = {
            nombre: button.getAttribute('classnombre'),
            imagen: button.getAttribute('classimagen'),
            precio: parseFloat(button.getAttribute('classprecio'))
        };
        cart.addToCart(product);
    });
});


