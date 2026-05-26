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