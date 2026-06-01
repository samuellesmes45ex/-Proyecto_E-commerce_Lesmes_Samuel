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

// ================= INICIO ADMIN COMPONENTS =================
class AdminSidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <aside class="sidebar" style="width: 250px; background: #fff; border-right: 1px solid #eaeaea; height: 100vh; padding: 20px 0; position: sticky; top: 0;">
                <div style="padding: 0 20px 20px; font-size: 20px; font-weight: bold; border-bottom: 1px solid #eaeaea; margin-bottom: 20px;">Admin Panel</div>
                <nav style="display: flex; flex-direction: column;">
                    <a class="nav-item active" data-view="dashboard" style="padding: 12px 20px; cursor: pointer; color: #000; font-weight: bold;">Dashboard</a>
                    <a class="nav-item" data-view="categorias" style="padding: 12px 20px; cursor: pointer; color: #666;">Categorías</a>
                    <a class="nav-item" data-view="productos" style="padding: 12px 20px; cursor: pointer; color: #666;">Productos</a>
                    <a class="nav-item" data-view="pedidos" style="padding: 12px 20px; cursor: pointer; color: #666;">Pedidos</a>
                </nav>
            </aside>
        `;

        this.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.querySelectorAll('.nav-item').forEach(n => { n.style.color = '#666'; n.style.fontWeight = 'normal'; });
                e.target.style.color = '#000';
                e.target.style.fontWeight = 'bold';
                window.dispatchEvent(new CustomEvent('changeAdminView', { detail: e.target.dataset.view }));
            });
        });
    }
}

class AdminNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="admin-nav" style="height: 60px; background: #fff; border-bottom: 1px solid #eaeaea; display: flex; justify-content: flex-end; align-items: center; padding: 0 30px;">
                <button id="btn-logout" style="background:#000; color:#fff; padding:8px 16px; border:none; border-radius:4px; cursor:pointer; font-weight:600;">
                    Cerrar Sesión
                </button>
            </header>
        `;
        
        this.querySelector('#btn-logout').addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('adminLogout'));
        });
    }
}

customElements.define('admin-sidebar', AdminSidebar);
customElements.define('admin-navbar', AdminNavbar);
// ================= FIN ADMIN COMPONENTS =================