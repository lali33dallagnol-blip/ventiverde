// ==================================================
// CONTROLE DE NAVEGAÇÃO ENTRE PÁGINAS/ABAS
// ==================================================
function switchPage(pageId, targetSectionId = null) {
    const homePage = document.getElementById('page-home');
    const cursosPage = document.getElementById('page-cursos');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Limpa classes ativas anteriores
    if (homePage) homePage.classList.remove('active');
    if (cursosPage) cursosPage.classList.remove('active');
    navLinks.forEach(link => link.classList.remove('active'));

    // 2. Direciona para a página solicitada
    if (pageId === 'home') {
        if (homePage) homePage.classList.add('active');
        
        const activeLink = document.querySelector('.nav-link[href="#home"]');
        if (activeLink) activeLink.classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } else if (pageId === 'cursos') {
        if (cursosPage) cursosPage.classList.add('active');

        // Se o clique foi para uma seção específica (#treinamentos ou #solucoes-tecnicas)
        if (targetSectionId) {
            const section = document.getElementById(targetSectionId);
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // 3. Atualiza destaque no menu e fecha menu mobile se estiver aberto
    updateActiveNavLink(pageId, targetSectionId);

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

// Auxiliar para destacar o link correto do menu (Cursos ou Serviços)
function updateActiveNavLink(pageId, targetSectionId) {
    if (pageId === 'cursos') {
        if (targetSectionId === 'solucoes-tecnicas') {
            const linkServicos = document.querySelector('.nav-link[href="#servicos"]');
            if (linkServicos) linkServicos.classList.add('active');
        } else {
            const linkCursos = document.querySelector('.nav-link[href="#cursos"]');
            if (linkCursos) linkCursos.classList.add('active');
        }
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
    const hash = window.location.hash;

    if (hash === '#cursos' || hash === '#treinamentos') {
        switchPage('cursos', 'treinamentos');
    } else if (hash === '#servicos' || hash === '#solucoes-tecnicas' || hash === '#cursos-servicos') {
        switchPage('cursos', 'solucoes-tecnicas');
    } else {
        switchPage('home');
    }
});
