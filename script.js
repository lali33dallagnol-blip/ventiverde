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

    Object.keys(pages).forEach(key => {
        if (pages[key]) {
            pages[key].classList.remove('active');
            pages[key].style.display = 'none';
        }
    });

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

    window.scrollTo(0, 0);
    closeMobileMenu();

    if (activeId === 'cursos') {
        closeCourseCategory();
    }
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
    const hub = document.getElementById('cursos-hub');
    const agricolaCategory = document.getElementById('category-drone-agricola');
    const imagemCategory = document.getElementById('category-drones-imagem');
    const geoprocessamentoCategory = document.getElementById('category-geoprocessamento');

    if (hub) hub.style.display = 'none';

    if (category === 'drone-agricola' && agricolaCategory) {
        if (imagemCategory) imagemCategory.style.display = 'none';
        if (geoprocessamentoCategory) geoprocessamentoCategory.style.display = 'none';
        agricolaCategory.style.display = 'block';
    } else if ((category === 'drones' || category === 'drones-imagem') && imagemCategory) {
        if (agricolaCategory) agricolaCategory.style.display = 'none';
        if (geoprocessamentoCategory) geoprocessamentoCategory.style.display = 'none';
        imagemCategory.style.display = 'block';
    } else if (category === 'geoprocessamento' && geoprocessamentoCategory) {
        if (agricolaCategory) agricolaCategory.style.display = 'none';
        if (imagemCategory) imagemCategory.style.display = 'none';
        geoprocessamentoCategory.style.display = 'block';
    }

    const pageCursos = document.getElementById('page-cursos');
    if (pageCursos) {
        pageCursos.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeCourseCategory() {
    const hub = document.getElementById('cursos-hub');
    const agricolaCategory = document.getElementById('category-drone-agricola');
    const imagemCategory = document.getElementById('category-drones-imagem');
    const geoprocessamentoCategory = document.getElementById('category-geoprocessamento');

    if (agricolaCategory) agricolaCategory.style.display = 'none';
    if (imagemCategory) imagemCategory.style.display = 'none';
    if (geoprocessamentoCategory) geoprocessamentoCategory.style.display = 'none';
    if (hub) hub.style.display = 'grid';

    const pageCursos = document.getElementById('page-cursos');
    if (pageCursos) {
        pageCursos.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================================================
// 3. AUTO-SLIDE DO CARROSSEL (DESLIZA SOZINHO A CADA 5s)
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
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000);
}

function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

// ==================================================
// 4. EVENTOS APÓS O CARREGAMENTO DO DOM
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    startSlideTimer();

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

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
