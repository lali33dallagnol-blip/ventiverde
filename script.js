// ==================================================
// 1. CONTROLE DE NAVEGAÇÃO ENTRE PÁGINAS (SPA)
// ==================================================
function switchPage(pageId) {
    const pages = {
        'home': document.getElementById('page-home'),
        'cursos': document.getElementById('page-cursos'),
        'servicos': document.getElementById('page-servicos')
    };

    const navLinks = document.querySelectorAll('.nav-link');

    // Oculta todas as páginas
    Object.keys(pages).forEach(key => {
        if (pages[key]) {
            pages[key].classList.remove('active');
            pages[key].style.display = 'none';
        }
    });

    // Remove classe active dos links do menu
    navLinks.forEach(link => link.classList.remove('active'));

    const activePage = pages[pageId] || pages['home'];
    const activeId = pages[pageId] ? pageId : 'home';

    if (activePage) {
        activePage.style.display = 'block';
        activePage.classList.add('active');
    }

    const activeLink = document.querySelector(`.nav-link[onclick*="'${activeId}'"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();

    // Se navegou para a página de cursos geral (ex: pelo menu)
    if (activeId === 'cursos') {
        closeCourseCategory();
    }
}

// Função para abrir o curso diretamente vindo do carrossel da Home
function openCourseDirectly(category) {
    switchPage('cursos');
    openCourseCategory(category);
}

function scrollToContato(event) {
    if (event) event.preventDefault();
    closeMobileMenu();
    const footerContato = document.getElementById('contato');
    if (footerContato) {
        footerContato.scrollIntoView({ behavior: 'smooth' });
    }
}

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
// 2. GERENCIAMENTO DAS SUBCATEGORIAS DE CURSOS
// ==================================================
function openCourseCategory(category) {
    const hubHeader = document.getElementById('hub-header');
    const hubGrid = document.getElementById('cursos-hub');
    const agricolaCategory = document.getElementById('category-drone-agricola');
    const imagemCategory = document.getElementById('category-drones-imagem');
    const geoprocessamentoCategory = document.getElementById('category-geoprocessamento');

    // Esconde o Título Principal e o Grid de Opções para evitar duplicidade visual
    if (hubHeader) hubHeader.style.display = 'none';
    if (hubGrid) hubGrid.style.display = 'none';

    // Esconde todas as visões para mostrar apenas a selecionada
    if (agricolaCategory) agricolaCategory.style.display = 'none';
    if (imagemCategory) imagemCategory.style.display = 'none';
    if (geoprocessamentoCategory) geoprocessamentoCategory.style.display = 'none';

    if (category === 'drone-agricola' && agricolaCategory) {
        agricolaCategory.style.display = 'block';
    } else if ((category === 'drones' || category === 'drones-imagem') && imagemCategory) {
        imagemCategory.style.display = 'block';
    } else if (category === 'geoprocessamento' && geoprocessamentoCategory) {
        geoprocessamentoCategory.style.display = 'block';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCourseCategory() {
    const hubHeader = document.getElementById('hub-header');
    const hubGrid = document.getElementById('cursos-hub');
    const agricolaCategory = document.getElementById('category-drone-agricola');
    const imagemCategory = document.getElementById('category-drones-imagem');
    const geoprocessamentoCategory = document.getElementById('category-geoprocessamento');

    if (agricolaCategory) agricolaCategory.style.display = 'none';
    if (imagemCategory) imagemCategory.style.display = 'none';
    if (geoprocessamentoCategory) geoprocessamentoCategory.style.display = 'none';

    // Restaura o HUB e Título Principal
    if (hubHeader) hubHeader.style.display = 'block';
    if (hubGrid) hubGrid.style.display = 'grid';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================================================
// 3. AUTO-SLIDE DO CARROSSEL COM PAUSA AO HOVER
// ==================================================
let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    if (!slides.length) return;

    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentSlideIndex + step);
    resetSlideTimer();
}

function currentSlide(index) {
    showSlide(index);
    resetSlideTimer();
}

function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000);
}

function stopSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
}

function resetSlideTimer() {
    stopSlideTimer();
    startSlideTimer();
}

// ==================================================
// 4. EVENTOS APÓS O CARREGAMENTO DO DOM
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    startSlideTimer();

    // Pausa o carrossel no mouseover para permitir leitura tranquila
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopSlideTimer);
        heroCarousel.addEventListener('mouseleave', startSlideTimer);
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Animação de Scroll Suave
    const animElements = document.querySelectorAll('.scroll-anim');

    const observerOptions = {
        root: null,
        threshold: 0.1,
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
// 5. CARREGAMENTO DIRETO VIA HASH DA URL
// ==================================================
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');

    if (hash === 'cursos' || hash === 'treinamentos') {
        switchPage('cursos');
    } else if (hash === 'servicos' || hash === 'solucoes-tecnicas') {
        switchPage('servicos');
    } else if (hash === 'contato') {
        switchPage('home');
        setTimeout(() => {
            scrollToContato();
        }, 300);
    } else {
        switchPage('home');
    }
});
