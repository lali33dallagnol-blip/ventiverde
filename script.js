// CONTROLE DE NAVEGAÇÃO ENTRE ABAS/PÁGINAS (Leve e Sem Framework)
function switchPage(pageId) {
    const homePage = document.getElementById('page-home');
    const cursosPage = document.getElementById('page-cursos');
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove active de todos os links e páginas
    homePage.classList.remove('active');
    cursosPage.classList.remove('active');
    navLinks.forEach(link => link.classList.remove('active'));

    if (pageId === 'home') {
        homePage.classList.add('active');
        document.querySelector('a[href="#home"]').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageId === 'cursos') {
        cursosPage.classList.add('active');
        document.querySelector('a[href="#cursos-servicos"]').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Fecha o menu hambúrguer no mobile após o clique
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    if(navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
    }
}

// MENU HAMBÚRGUER (MOBILE)
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });

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

// Correção de hash direto na URL (caso o usuário atualize a página)
window.addEventListener('load', () => {
    if (window.location.hash === '#cursos-servicos') {
        switchPage('cursos');
    } else {
        switchPage('home');
    }
});
