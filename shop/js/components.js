// ================= INICIO CLIENTE COMPONENTS =================

class ShopNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="shop-nav">
                <a href="#" class="logo">NEJER</a>
                <div class="cart-trigger" id="open-cart-btn">
                    Cesta <span class="cart-count" id="nav-cart-count">0</span>
                </div>
            </header>
        `;
        this.querySelector('#open-cart-btn').addEventListener('click', () => {
            window.dispatchEvent(new Event('openCart'));
        });
    }
}

class ProductCard extends HTMLElement {
    connectedCallback() {
        const product = JSON.parse(this.getAttribute('data-product'));
        this.innerHTML = `
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
                    <button class="btn btn-dark add-to-cart-btn" data-id="${product.id}">Agregar</button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-price">$${product.price}</span>
                </div>
            </div>
        `;

        this.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
        });
    }
}

class ShopCart extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="cart-overlay" id="cart-overlay"></div>
            <div class="cart-drawer" id="cart-drawer">
                <div class="cart-header">
                    <h2>Tu Cesta</h2>
                    <span class="close-cart" id="close-cart-btn">&times;</span>
                </div>
                
                <div class="cart-items" id="cart-items-container"></div>
                
                <form class="checkout-form" id="checkout-form">
                    <h3>Datos de Envío</h3>
                    <input type="text" id="chk-name" placeholder="Nombre completo" required>
                    <input type="email" id="chk-email" placeholder="Correo electrónico" required>
                    <input type="text" id="chk-address" placeholder="Dirección de envío" required>
                    <button type="submit" class="btn btn-dark">Confirmar Pedido</button>
                    <button type="button" class="btn btn-outline" id="btn-back-cart">Volver</button>
                </form>

                <div class="cart-footer" id="cart-footer-actions">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span id="cart-total-price">$0.00</span>
                    </div>
                    <button class="btn btn-dark" style="width:100%" id="btn-checkout">Proceder al pago</button>
                </div>
            </div>
        `;

        // Lógica de apertura/cierre
        const overlay = this.querySelector('#cart-overlay');
        const drawer = this.querySelector('#cart-drawer');
        
        const closeCart = () => {
            overlay.classList.remove('active');
            drawer.classList.remove('active');
        };

        this.querySelector('#close-cart-btn').addEventListener('click', closeCart);
        overlay.addEventListener('click', closeCart);

        window.addEventListener('openCart', () => {
            overlay.classList.add('active');
            drawer.classList.add('active');
        });
    }
}

customElements.define('shop-navbar', ShopNavbar);
customElements.define('product-card', ProductCard);
customElements.define('shop-cart', ShopCart);
// ================= FIN CLIENTE COMPONENTS =================