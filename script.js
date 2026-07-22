// CONTROLE DE NAVEGAÇÃO ENTRE ABAS/PÁGINAS
function switchPage(pageId, targetSectionId = null) {
    const homePage = document.getElementById('page-home');
    const cursosPage = document.getElementById('page-cursos');
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove active de todos os links e páginas
    if (homePage) homePage.classList.remove('active');
    if (cursosPage) cursosPage.classList.remove('active');
    navLinks.forEach(link => link.classList.remove('active'));

    if (pageId === 'home') {
        if (homePage) homePage.classList.add('active');
        const activeLink = document.querySelector('.nav-link[href="#home"]');
        if (activeLink) activeLink.classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } else if (pageId === 'cursos') {
        if (cursosPage) cursosPage.classList.add('active');

        // Se veio de um clique específico ou pela URL
        if (targetSectionId) {
            const section = document.getElementById(targetSectionId);
            if (section) {
                // Pequeno atraso para aguardar a troca de exibição da página
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Atualiza estado ativo dos links da Navbar
    updateActiveNavLink(pageId, targetSectionId);

    // Fecha o menu hambúrguer no mobile após a seleção
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// Auxiliar para destacar o link correto do menu
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

// EVENTOS INICIAIS E MENU HAMBÚRGUER
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle do Menu Mobile
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // SISTEMA DE ANIMAÇÃO AO ROLAR A TELA (Intersection Observer)
    const animElements = document.querySelectorAll('.scroll-anim');
    
    const options = {
        root: null,
        threshold: 0.15, // Gatilho dispara quando 15% do elemento está visível
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Executa a animação apenas uma vez
            }
        });
    }, options);

    animElements.forEach(el => observer.observe(el));
});

// GERENCIAMENTO DE CARREGAMENTO DIRETO VIA HASH DA URL
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
