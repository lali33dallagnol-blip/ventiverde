// ==================================================
// CONTROLE DE NAVEGAÇÃO ENTRE PÁGINAS (SPA)
// ==================================================
function switchPage(pageId) {
    const pages = {
        'home': document.getElementById('page-home'),
        'cursos': document.getElementById('page-cursos'),
        'servicos': document.getElementById('page-servicos')
    };

    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Esconde todas as páginas e remove destaques do menu
    Object.keys(pages).forEach(key => {
        if (pages[key]) {
            pages[key].classList.remove('active');
            pages[key].style.display = 'none';
        }
    });

    navLinks.forEach(link => link.classList.remove('active'));

    // 2. Torna visível a página desejada
    const activePage = pages[pageId] || pages['home'];
    const activeId = pages[pageId] ? pageId : 'home';

    if (activePage) {
        activePage.style.display = 'block';
        activePage.classList.add('active');
    }

    // 3. Atualiza o link ativo na Navbar buscando pelo parâmetro onclick
    const activeLink = document.querySelector(`.nav-link[onclick*="'${activeId}'"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // 4. Força o topo da tela imediatamente (Destrava o bug de rolagem no footer)
    window.scrollTo(0, 0);

    // 5. Fecha o menu mobile caso esteja aberto
    closeMobileMenu();

    // 6. Se alternou para a página de cursos, reseta para o HUB de cursos
    if (activeId === 'cursos') {
        const hub = document.getElementById('cursos-hub');
        const dronesCategory = document.getElementById('category-drones');
        const geoprocessamentoCategory = document.getElementById('category-geoprocessamento');

        if (dronesCategory) dronesCategory.style.display = 'none';
        if (geoprocessamentoCategory) geoprocessamentoCategory.style.display = 'none';
        if (hub) hub.style.display = 'grid';
    }
}

// Auxiliar para fechar o menu mobile
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
}

// ==================================================
// GERENCIAMENTO DAS SUBCATEGORIAS DE CURSOS
// ==================================================
function openCourseCategory(category) {
    const hub = document.getElementById('cursos-hub');
    const dronesCategory = document.getElementById('category-drones');
    const geoprocessamentoCategory = document.getElementById('category-geoprocessamento');

    if (hub) hub.style.display = 'none';

    if (category === 'drones' && dronesCategory) {
        if (geoprocessamentoCategory) geoprocessamentoCategory.style.display = 'none';
        dronesCategory.style.display = 'block';
    } else if (category === 'geoprocessamento' && geoprocessamentoCategory) {
        if (dronesCategory) dronesCategory.style.display = 'none';
        geoprocessamentoCategory.style.display = 'block';
    }

    // Rola suavemente até o início do conteúdo da página de cursos
    const pageCursos = document.getElementById('page-cursos');
    if (pageCursos) {
        pageCursos.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeCourseCategory() {
    const hub = document.getElementById('cursos-hub');
    const dronesCategory = document.getElementById('category-drones');
    const geoprocessamentoCategory = document.getElementById('category-geoprocessamento');

    if (dronesCategory) dronesCategory.style.display = 'none';
    if (geoprocessamentoCategory) geoprocessamentoCategory.style.display = 'none';
    if (hub) hub.style.display = 'grid';

    // Rola suavemente de volta ao HUB de cursos
    const pageCursos = document.getElementById('page-cursos');
    if (pageCursos) {
        pageCursos.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================================================
// EVENTOS APÓS O CARREGAMENTO DO DOM
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Alternador do Menu Mobile (Hambúrguer -> X)
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Fecha o menu mobile ao clicar em links de âncora direta (ex: #contato)
    const anchorLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Sistema de Animação ao Rolar a Tela (Intersection Observer)
    const animElements = document.querySelectorAll('.scroll-anim');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));
});

// ==================================================
// GERENCIAMENTO DE CARREGAMENTO DIRETO VIA HASH DA URL
// ==================================================
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');

    if (hash === 'cursos' || hash === 'treinamentos') {
        switchPage('cursos');
    } else if (hash === 'servicos' || hash === 'solucoes-tecnicas') {
        switchPage('servicos');
    } else {
        switchPage('home');
    }
});
