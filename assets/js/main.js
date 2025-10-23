// Funciones para cargar componentes compartidos
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Cargar componentes y manejar navegación
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header y footer
    loadComponents();
});

function loadComponents() {
    // Cargar header
    fetch('partials/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            updateActiveNavigation();
        })
        .catch(error => console.error('Error loading header:', error));

    // Cargar footer
    fetch('partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

function updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    const pageIndicator = document.getElementById('currentPage');
    
    if (pageIndicator) {
        if (currentPath.includes('tramites')) {
            pageIndicator.textContent = 'Trámites para Extranjeros';
        } else if (currentPath.includes('transito')) {
            pageIndicator.textContent = 'Consultas de Tránsito';
        } else if (currentPath.includes('seguridad')) {
            pageIndicator.textContent = 'Seguridad Ciudadana';
        } else if (currentPath.includes('telecom')) {
            pageIndicator.textContent = 'Telecomunicaciones';
        } else {
            pageIndicator.textContent = 'Inicio';
        }
    }

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.endsWith(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Función para el menú móvil
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Función para animaciones al hacer scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Función para manejar la navegación activa
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('text-[#D4AF37]');
        }
    });
}
