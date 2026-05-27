# 🛍️ E-Commerce & Admin Dashboard (Vanilla JS)

Una plataforma de comercio electrónico moderna, responsiva y dividida en dos módulos completamente independientes (Frontend Cliente y Frontend Administrador). Desarrollada utilizando exclusivamente tecnologías web nativas, aplicando el principio de separación de responsabilidades (Separation of Concerns).

## 🚀 Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Estilos puros, variables CSS, Flexbox, CSS Grid y diseño responsivo (Mobile First).
* **JavaScript Vanilla (ES6+):** Lógica de negocio, manipulación del DOM y enrutamiento SPA (Single Page Application).
* **Web Components:** Creación de etiquetas HTML personalizadas (`<admin-sidebar>`, `<admin-navbar>`, `<product-card>`) encapsulando estructura y comportamiento.
* **LocalStorage:** Persistencia de datos en el navegador para simular una base de datos en tiempo real entre los módulos.

## 🏗️ Arquitectura del Proyecto

El proyecto está claramente dividido en dos mundos independientes que se comunican únicamente a través de la base de datos local:

\`\`\`text
/project
│
├── index.html            # Portal de acceso raíz (Landing page)
│
├── /admin                # MÓDULO ADMINISTRADOR (Privado)
│   ├── admin.html        # Estructura base del panel
│   ├── /css
│   │   └── admin.css     # Estilos exclusivos del panel
│   └── /js
│       └── admin.js      # Lógica SPA, Web Components y CRUDs
│
└── /shop                 # MÓDULO CLIENTE (Público)
    ├── index.html        # Estructura base de la tienda
    ├── /css
    │   └── shop.css      # Estilos minimalistas y UI de la tienda
    └── /js
        └── shop.js       # Lógica del carrito, checkout y Web Components
\`\`\`

## ✨ Características Principales

### 1. Panel de Administración (`/admin`)
* **Sistema de Autenticación:** Login simulado con persistencia de sesión.
* **Dashboard SPA:** Navegación fluida sin recarga de página.
* **Gestión de Productos (CRUD):** Capacidad de agregar, visualizar y eliminar prendas del catálogo usando URLs de imágenes para optimizar memoria.
* **Gestión de Pedidos:** Visualización detallada de las compras realizadas por los clientes, incluyendo datos de envío y desglose de artículos.
* **Web Components Nativos:** Menú lateral y barra superior encapsulados.

### 2. Tienda Pública (`/shop`)
* **Diseño Minimalista y Moderno:** Interfaz enfocada en la experiencia de usuario (UX) con transiciones suaves y estados de *hover*.
* **Catálogo Dinámico:** Renderizado en tiempo real de los productos añadidos por el administrador.
* **Carrito de Compras Flotante:** Un *drawer* interactivo que permite revisar y eliminar productos antes del pago.
* **Checkout Integrado:** Formulario de envío que genera una orden de compra enviada directamente al panel del administrador.

## 🛠️ Cómo Ejecutar el Proyecto

Al ser un proyecto Frontend estático que no requiere de Node.js, empaquetadores ni bases de datos externas, su ejecución es muy sencilla:

1.  Clona o descarga este repositorio en tu máquina local.
2.  Abre la carpeta del proyecto en tu editor de código preferido (ej. Visual Studio Code).
3.  Inicia un servidor local para evitar bloqueos de CORS al cargar los módulos JS. Recomendación: Usa la extensión **Live Server** en VS Code.
4.  Abre el archivo `index.html` de la raíz en tu navegador.
5.  **Para probar el Administrador:** Ingresa con las credenciales por defecto:
    * **Email:** `admin@mail.com`
    * **Password:** `123456`

## 🧠 Flujo de Datos (LocalStorage)

El sistema utiliza las siguientes claves en la memoria del navegador para compartir el estado:
* `clothing_admin_auth`: Estado booleano de la sesión del administrador.
* `clothing_products`: Array de objetos que contiene el catálogo de prendas.
* `clothing_cart`: Estado temporal de la cesta del usuario.
* `clothing_orders`: Historial de compras finalizadas con detalles de envío.

---
*Desarrollado con enfoque en buenas prácticas, código limpio y escalabilidad.*
