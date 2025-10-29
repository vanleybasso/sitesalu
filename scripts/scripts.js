// ====================
// INICIALIZAÇÃO DO TEMA
// ====================

// Função para inicializar o tema
function initializeTheme() {
    // Verifica se o usuário já tem uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    
    // Se não tem preferência salva, define como claro
    if (!savedTheme) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeToggleIcon('light');
    } else {
        // Se tem preferência, usa a salva
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggleIcon(savedTheme);
    }
}

// Função para atualizar o ícone do botão de tema
function updateThemeToggleIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// ====================
// MENU MOBILE
// ====================

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Altera o ícone do menu
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Fechar menu ao clicar em um link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
}

// ====================
// CAROUSEL DE SCREENSHOTS
// ====================

function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Função para mostrar slide específico
    function showSlide(index) {
        // Remove classe active de todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove classe active de todos os indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Adiciona classe active ao slide atual
        slides[index].classList.add('active');
        
        // Adiciona classe active ao indicador atual
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Próximo slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Slide anterior
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        showSlide(prevIndex);
    }
    
    // Event listeners para botões
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-play (opcional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Inicia auto-play
    startAutoPlay();
    
    // Pausa auto-play quando o mouse está sobre o carousel
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// ====================
// SCROLL SUAVE
// ====================

function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-column a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Só aplica scroll suave para links âncora
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Considera o header fixo
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // Links externos (WhatsApp, etc.) abrem normalmente
        });
    });
}

// ====================
// HEADER SCROLL EFFECT
// ====================

function initializeHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'var(--header-bg)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'var(--header-bg)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScrollY = window.scrollY;
    });
}

// ====================
// ANIMAÇÃO DE REVEAL
// ====================

function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .feature-card, .step, .testimonial-card, .pricing-card');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ====================
// ALTERNÂNCIA DE TEMA
// ====================

function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleIcon(newTheme);
        });
    }
}

// ====================
// FORMULÁRIO DE CONTATO (se houver)
// ====================

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para enviar o formulário
            // Por exemplo, usando Fetch API ou redirecionando para WhatsApp
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Exemplo: Redirecionar para WhatsApp com a mensagem
            const whatsappMessage = `Olá! Meu nome é ${name}. ${message}`;
            const whatsappUrl = `https://wa.me/5516988100103?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
}

// ====================
// CONTADORES (se necessário)
// ====================

function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 segundos
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(function() {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// ====================
// INICIALIZAÇÃO GERAL
// ====================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o tema (modo claro como padrão para novos usuários)
    initializeTheme();
    
    // Inicializa todas as funcionalidades
    initializeMobileMenu();
    initializeCarousel();
    initializeSmoothScroll();
    initializeHeaderScroll();
    initializeScrollReveal();
    initializeThemeToggle();
    initializeContactForm();
    initializeCounters();
    
    console.log('Salú - Sistema inicializado com sucesso!');
});

// ====================
// TRATAMENTO DE ERROS
// ====================

window.addEventListener('error', function(e) {
    console.error('Erro detectado:', e.error);
});

// ====================
// LOADING PERFORMANCE
// ====================

// Preload de imagens importantes (opcional)
function preloadImages() {
    const images = [
        '/logo.png',
        '/favicon.png',
        '/captura1.jpg',
        '/captura2.jpg',
        '/captura3.jpg',
        '/captura4.jpg',
        '/captura5.jpg',
        '/captura6.jpg',
        '/captura7.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Chama o preload após o carregamento inicial
window.addEventListener('load', preloadImages);