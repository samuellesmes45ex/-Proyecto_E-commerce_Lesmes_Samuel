// ================= INICIO CLIENTE JS =================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATOS DE PRUEBA (Si el Admin no ha creado nada aún) ---
    if (!localStorage.getItem('clothing_products')) {
        const dummyProducts = [
            { id: 1, name: 'Camiseta Básica Heavyweight', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80' },
            { id: 2, name: 'Pantalón Cargo Nejer', price: 59.99, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=500&q=80' },
            { id: 3, name: 'Sudadera Essential', price: 45.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80' },
            { id: 4, name: 'Chaqueta Puffer', price: 89.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80' }
        ];
        localStorage.setItem('clothing_products', JSON.stringify(dummyProducts));
    }

    // --- ESTADO GLOBAL ---
    let cart = JSON.parse(localStorage.getItem('clothing_cart')) || [];
    const products = JSON.parse(localStorage.getItem('clothing_products')) || [];

    // --- RENDERIZAR PRODUCTOS ---
    const productsContainer = document.getElementById('products-container');
    
    function renderProducts(productsToRender) {
        productsContainer.innerHTML = '';
        productsToRender.forEach(prod => {
            const card = document.createElement('product-card');
            card.setAttribute('data-product', JSON.stringify(prod));
            productsContainer.appendChild(card);
        });
    }
    renderProducts(products);

    // --- LÓGICA DEL CARRITO ---
    const updateCartUI = () => {
        document.getElementById('nav-cart-count').textContent = cart.length;
        localStorage.setItem('clothing_cart', JSON.stringify(cart));
        
        const container = document.getElementById('cart-items-container');
        container.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center; margin-top:20px; color:#666;">Tu cesta está vacía</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                container.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <h4 style="font-size:14px; margin-bottom:5px;">${item.name}</h4>
                            <p>$${item.price}</p>
                            <button class="btn-outline" style="border:none; color:red; padding:0; margin-top:10px; cursor:pointer;" onclick="window.removeItem(${index})">Eliminar</button>
                        </div>
                    </div>
                `;
            });
        }
        document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;
    };

    window.addEventListener('addToCart', (e) => {
        cart.push(e.detail);
        updateCartUI();
        window.dispatchEvent(new Event('openCart')); // Abre el modal visualmente
    });

    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    updateCartUI();

    // --- LÓGICA DE CHECKOUT ---
    const btnCheckout = document.getElementById('btn-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartFooterActions = document.getElementById('cart-footer-actions');
    const btnBackCart = document.getElementById('btn-back-cart');

    btnCheckout.addEventListener('click', () => {
        if(cart.length === 0) return alert('El carrito está vacío');
        cartItemsContainer.style.display = 'none';
        cartFooterActions.style.display = 'none';
        checkoutForm.classList.add('active');
    });

    btnBackCart.addEventListener('click', () => {
        cartItemsContainer.style.display = 'block';
        cartFooterActions.style.display = 'block';
        checkoutForm.classList.remove('active');
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            clientName: document.getElementById('chk-name').value,
            email: document.getElementById('chk-email').value,
            address: document.getElementById('chk-address').value,
            items: cart,
            total: cart.reduce((acc, item) => acc + item.price, 0)
        };

        // Guardar en Base de Datos (localStorage para el Admin)
        const orders = JSON.parse(localStorage.getItem('clothing_orders')) || [];
        orders.push(newOrder);
        localStorage.setItem('clothing_orders', JSON.stringify(orders));

        // Limpiar
        cart = [];
        updateCartUI();
        alert('¡Pedido realizado con éxito! El administrador lo verá en su panel.');
        document.querySelector('.cart-overlay').click(); // Cierra modal
        
        // Reset vistas
        btnBackCart.click();
        checkoutForm.reset();
    });
});
// ================= FIN CLIENTE JS =================