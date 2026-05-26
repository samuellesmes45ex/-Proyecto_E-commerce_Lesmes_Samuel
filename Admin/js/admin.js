// ==========================================
// 1. DEFINICIÓN DE WEB COMPONENTS
// ==========================================

class AdminSidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <aside style="width: 250px; background: #fff; border-right: 1px solid #eaeaea; height: 100vh; padding: 20px 0; position: sticky; top: 0;">
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
            <header style="height: 60px; background: #fff; border-bottom: 1px solid #eaeaea; display: flex; justify-content: flex-end; align-items: center; padding: 0 30px;">
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

// Registrar los componentes en el navegador
customElements.define('admin-sidebar', AdminSidebar);
customElements.define('admin-navbar', AdminNavbar);


// ==========================================
// 2. LÓGICA DE LA APLICACIÓN (SPA)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('login-error');
    const contentArea = document.getElementById('content-area');

    // --- MANEJO DE SESIÓN ---
    const checkAuth = () => {
        if (localStorage.getItem('clothing_admin_auth') === 'true') {
            loginView.style.display = 'none';
            dashboardView.style.display = 'flex';
            renderView('dashboard');
        } else {
            loginView.style.display = 'flex';
            dashboardView.style.display = 'none';
        }
    };

    window.addEventListener('adminLogout', () => {
        localStorage.removeItem('clothing_admin_auth');
        checkAuth();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        if (email === 'admin@mail.com' && pass === '123456') {
            localStorage.setItem('clothing_admin_auth', 'true');
            errorMsg.style.display = 'none';
            loginForm.reset();
            checkAuth();
        } else {
            errorMsg.textContent = "Credenciales incorrectas";
            errorMsg.style.display = 'block';
        }
    });

    checkAuth();

    // --- MANEJO DE VISTAS ---
    window.addEventListener('changeAdminView', (e) => {
        renderView(e.detail);
    });

    function getDB(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    // --- RENDERIZADO DE MÓDULOS ---
    function renderView(view) {
        switch (view) {
            case 'dashboard':
                contentArea.innerHTML = `
                    <h1 style="margin-bottom:20px;">Panel de Control</h1>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:20px;">
                        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #eaeaea;">
                            <h3 style="color:#666; font-size:14px; margin-bottom:10px;">Productos</h3>
                            <p style="font-size:28px; font-weight:bold;">${getDB('clothing_products').length}</p>
                        </div>
                        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #eaeaea;">
                            <h3 style="color:#666; font-size:14px; margin-bottom:10px;">Categorías</h3>
                            <p style="font-size:28px; font-weight:bold;">${getDB('clothing_categories').length}</p>
                        </div>
                        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #eaeaea;">
                            <h3 style="color:#666; font-size:14px; margin-bottom:10px;">Pedidos</h3>
                            <p style="font-size:28px; font-weight:bold;">${getDB('clothing_orders').length}</p>
                        </div>
                    </div>
                `;
                break;

            case 'productos':
                const products = getDB('clothing_products');
                contentArea.innerHTML = `
                    <div style="display:flex; justify-content:space-between; margin-bottom: 20px;">
                        <h1>Gestión de Prendas</h1>
                        <button id="btn-add-product" style="background:#000; color:#fff; padding:10px 20px; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">+ Nuevo Producto</button>
                    </div>
                    
                    <table style="width:100%; border-collapse:collapse; background:#fff; border-radius:8px; overflow:hidden; border:1px solid #eaeaea;">
                        <thead style="background:#f9f9f9; border-bottom:1px solid #eaeaea;">
                            <tr>
                                <th style="padding:15px; text-align:left;">Imagen</th>
                                <th style="padding:15px; text-align:left;">Nombre</th>
                                <th style="padding:15px; text-align:left;">Precio</th>
                                <th style="padding:15px; text-align:left;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.length === 0 ? '<tr><td colspan="4" style="padding:15px; text-align:center;">No hay prendas</td></tr>' : products.map((p, index) => `
                                <tr style="border-bottom:1px solid #eaeaea;">
                                    <td style="padding:15px;"><img src="${p.image}" width="50" style="border-radius:4px;"></td>
                                    <td style="padding:15px; font-weight:500;">${p.name}</td>
                                    <td style="padding:15px;">$${parseFloat(p.price).toFixed(2)}</td>
                                    <td style="padding:15px;">
                                        <button class="btn-delete" data-index="${index}" style="background:#ff4444; color:white; padding:6px 12px; border:none; border-radius:4px; cursor:pointer;">Eliminar</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div id="product-modal" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index:1000;">
                        <div style="background:#fff; padding:30px; border-radius:8px; width:100%; max-width:500px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                                <h2>Añadir Prenda</h2>
                                <span id="close-modal" style="cursor:pointer; font-size:24px; font-weight:bold;">&times;</span>
                            </div>
                            <form id="product-form" style="display:flex; flex-direction:column; gap:15px;">
                                <div><label>Nombre:</label><input type="text" id="prod-name" required style="width:100%; padding:8px; margin-top:5px;"></div>
                                <div><label>Precio ($):</label><input type="number" step="0.01" id="prod-price" required style="width:100%; padding:8px; margin-top:5px;"></div>
                                <div><label>URL de Imagen:</label><input type="url" id="prod-image" placeholder="https://..." required style="width:100%; padding:8px; margin-top:5px;"></div>
                                <button type="submit" style="background:#000; color:#fff; padding:12px; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">Guardar Prenda</button>
                            </form>
                        </div>
                    </div>
                `;

                // Modal de Productos Lógica
                const modal = document.getElementById('product-modal');
                document.getElementById('btn-add-product').addEventListener('click', () => modal.style.display = 'flex');
                document.getElementById('close-modal').addEventListener('click', () => modal.style.display = 'none');

                // Guardar Producto
                document.getElementById('product-form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    const currentProducts = getDB('clothing_products');
                    currentProducts.push({
                        id: Date.now(),
                        name: document.getElementById('prod-name').value,
                        price: parseFloat(document.getElementById('prod-price').value),
                        image: document.getElementById('prod-image').value
                    });
                    localStorage.setItem('clothing_products', JSON.stringify(currentProducts));
                    renderView('productos');
                });

                // Eliminar Producto
                document.querySelectorAll('.btn-delete').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        if(confirm('¿Eliminar prenda?')) {
                            const index = e.target.getAttribute('data-index');
                            const currentProducts = getDB('clothing_products');
                            currentProducts.splice(index, 1);
                            localStorage.setItem('clothing_products', JSON.stringify(currentProducts));
                            renderView('productos');
                        }
                    });
                });
                break;

            case 'categorias':
                contentArea.innerHTML = `<h1>Categorías</h1><p>Módulo de categorías</p>`;
                break;
                case 'pedidos':
                    const orders = getDB('clothing_orders');
                    
                    // Cabecera de la sección
                    let htmlPedidos = `
                        <div style="display:flex; justify-content:space-between; margin-bottom: 20px;">
                            <h1>Gestión de Pedidos</h1>
                        </div>
                    `;
    
                    // Validar si no hay pedidos
                    if (orders.length === 0) {
                        htmlPedidos += `<p style="background:#fff; padding:20px; border-radius:8px; text-align:center; border:1px solid #eaeaea;">No hay pedidos registrados aún.</p>`;
                    } else {
                        // Ordenar pedidos del más nuevo al más viejo
                        const sortedOrders = orders.sort((a, b) => b.id - a.id);
    
                        // Generar una tarjeta detallada por cada pedido
                        sortedOrders.forEach(o => {
                            htmlPedidos += `
                                <div style="background:#fff; border:1px solid #eaeaea; border-radius:8px; margin-bottom:20px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.02);">
                                    
                                    <div style="background:#fafafa; padding:15px 20px; border-bottom:1px solid #eaeaea; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                                        <div>
                                            <strong style="display:block; font-size:16px;">Pedido #${o.id}</strong>
                                            <span style="color:#666; font-size:13px;">${new Date(o.date).toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <span style="background:#000; color:#fff; padding:6px 12px; border-radius:20px; font-size:13px; font-weight:bold;">
                                                Total Pagado: $${parseFloat(o.total).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
    
                                    <div style="padding:20px; display:flex; gap:30px; flex-wrap:wrap;">
                                        
                                        <div style="flex:1; min-width:250px;">
                                            <h4 style="margin-bottom:12px; font-size:14px; color:#666; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #eee; padding-bottom:5px;">Datos de Envío</h4>
                                            <p style="margin:8px 0; font-size:14px;"><strong>👤 Nombre:</strong> ${o.clientName}</p>
                                            <p style="margin:8px 0; font-size:14px;"><strong>📧 Email:</strong> ${o.email}</p>
                                            <p style="margin:8px 0; font-size:14px;"><strong>📍 Dirección:</strong> ${o.address}</p>
                                        </div>
    
                                        <div style="flex:2; min-width:300px;">
                                            <h4 style="margin-bottom:12px; font-size:14px; color:#666; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #eee; padding-bottom:5px;">Artículos Comprados</h4>
                                            <div style="display:flex; flex-direction:column; gap:15px;">
                                                ${o.items.map(item => `
                                                    <div style="display:flex; align-items:center; gap:15px; background:#fdfdfd; padding:10px; border:1px solid #f0f0f0; border-radius:6px;">
                                                        <img src="${item.image}" alt="${item.name}" style="width:50px; height:60px; object-fit:cover; border-radius:4px; border:1px solid #ddd;">
                                                        <div style="flex:1;">
                                                            <strong style="display:block; font-size:14px;">${item.name}</strong>
                                                            <span style="color:#666; font-size:13px;">Precio unitario: $${parseFloat(item.price).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                    }
    
                    contentArea.innerHTML = htmlPedidos;
                    break;
        }
    }
});