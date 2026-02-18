// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Side menu logic via Dynamic CSS
const menuStyle = document.createElement('style');
menuStyle.textContent = `
    @media (max-width: 968px) {
        .nav-links {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            background: rgba(255,255,255,0.98);
            padding: 40px;
            height: calc(100vh - 70px);
            transition: 0.5s ease-in-out;
            z-index: 999;
        }
        .nav-links.active {
            left: 0;
        }
    }
`;
document.head.appendChild(menuStyle);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navMenu.classList.remove('active');
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.exp-card, .s-box, .testi-card, .section-title, .hero-content').forEach(el => {
    el.classList.add('reveal-item');
    revealObserver.observe(el);
});

// Reveal CSS
const revealCSS = document.createElement('style');
revealCSS.textContent = `
    .reveal-item {
        opacity: 0;
        transform: translateY(30px);
        transition: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealCSS);
