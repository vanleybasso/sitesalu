// ====================
// CONSTANTES E CONFIGURAÇÕES
// ====================
const CONFIG = {
  carousel: {
    autoPlay: true,
    interval: 5000,
    slides: [
      { img: '/captura1.jpg' },
      { img: '/captura2.jpg' },
      { img: '/captura3.jpg' },
      { img: '/captura4.jpg' },
      { img: '/captura5.jpg' },
      { img: '/captura6.jpg' },
      { img: '/captura7.jpg' }
    ]
  }
};

// ====================
// GERENCIAMENTO DE TEMA
// ====================
class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.init();
  }

  init() {
    this.loadTheme();
    this.setupEventListeners();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateToggleIcon(savedTheme);
  }

  updateToggleIcon(theme) {
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector('i');
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateToggleIcon(newTheme);
    
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
  }

  setupEventListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
}

// ====================
// MENU MOBILE
// ====================
class MobileMenu {
  constructor() {
    this.menuToggle = document.querySelector('.menu-toggle');
    this.nav = document.querySelector('.modern-nav');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  toggleMenu() {
    this.nav.classList.toggle('active');
    this.menuToggle.classList.toggle('active');
    
    const spans = this.menuToggle.querySelectorAll('.hamburger span');
    if (this.nav.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  closeMenu() {
    this.nav.classList.remove('active');
    this.menuToggle.classList.remove('active');
    
    const spans = this.menuToggle.querySelectorAll('.hamburger span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }

  setupEventListeners() {
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMenu();
      }
    });
  }
}

// ====================
// CAROUSEL SIMPLES CENTRALIZADO
// ====================
class SimplePhoneCarousel {
  constructor() {
    this.carouselTrack = document.querySelector('.phone-carousel-track');
    this.prevBtn = document.querySelector('.phone-carousel-btn.prev-btn');
    this.nextBtn = document.querySelector('.phone-carousel-btn.next-btn');
    
    this.currentIndex = 0;
    this.totalSlides = CONFIG.carousel.slides.length;
    this.autoPlayInterval = null;
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.createSlides();
    this.setupEventListeners();
    this.startAutoPlay();
    this.updateCarousel();
  }

  createSlides() {
    // Limpa o track
    this.carouselTrack.innerHTML = '';
    
    // Cria todos os slides
    CONFIG.carousel.slides.forEach((slide, index) => {
      const slideElement = document.createElement('div');
      slideElement.className = `phone-slide ${index === this.currentIndex ? 'active' : ''}`;
      slideElement.setAttribute('data-index', index);
      slideElement.innerHTML = `
        <div class="floating-phone-slide">
          <div class="phone-screen">
            <img src="${slide.img}" alt="Captura do aplicativo ${index + 1}" loading="lazy">
          </div>
        </div>
      `;
      this.carouselTrack.appendChild(slideElement);
    });
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    
    this.isAnimating = true;
    
    // Atualizar índice
    this.currentIndex = index;
    
    // Animar transição
    this.animateTransition();
    
    // Resetar auto-play
    this.resetAutoPlay();
    
    // Habilitar animação após um delay
    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  animateTransition() {
    // Remover classe active de todos os slides
    const slides = this.carouselTrack.querySelectorAll('.phone-slide');
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Adicionar classe active ao slide atual
    const currentSlide = slides[this.currentIndex];
    if (currentSlide) {
      currentSlide.classList.add('active');
      
      // Atualizar posição do track
      this.carouselTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
  }

  updateCarousel() {
    // Atualizar posição inicial
    this.carouselTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  startAutoPlay() {
    if (CONFIG.carousel.autoPlay) {
      this.autoPlayInterval = setInterval(() => this.nextSlide(), CONFIG.carousel.interval);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  setupEventListeners() {
    // Botões de navegação
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }
    
    // Pausa auto-play ao interagir
    const carouselArea = document.querySelector('.phone-carousel-container');
    if (carouselArea) {
      carouselArea.addEventListener('mouseenter', () => this.stopAutoPlay());
      carouselArea.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
        this.resetAutoPlay();
      }
    });
    
    // Swipe em dispositivos touch
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    this.carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      this.stopAutoPlay();
    }, { passive: true });

    this.carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.nextSlide(); // Swipe para esquerda
        } else {
          this.prevSlide(); // Swipe para direita
        }
      }
      this.startAutoPlay();
    }, { passive: true });
  }
}

// ====================
// ANIMAÇÕES DE SCROLL
// ====================
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupHeaderScroll();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, this.observerOptions);

    // Elementos para animar (incluindo os novos da seção CTA)
    const elements = document.querySelectorAll(
      '.modern-card, .feature-item, .timeline-item, .benefit-card, .feature-group, .cta-card, .cta-feature'
    );
    elements.forEach(element => {
      element.classList.add('animate-on-scroll');
      observer.observe(element);
    });
  }

  setupHeaderScroll() {
    const header = document.querySelector('.modern-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.style.backdropFilter = 'blur(20px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      } else {
        header.style.backdropFilter = 'blur(12px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
    });
  }
}

// ====================
// TOGGLE DE PLANOS
// ====================
class PricingToggle {
  constructor() {
    this.toggle = document.querySelector('#pricing-toggle');
    this.monthlyPrices = [97, 197, 297, 497];
    this.annualPrices = this.monthlyPrices.map(price => Math.floor(price * 10 * 0.8));
    this.init();
  }

  init() {
    if (this.toggle) {
      this.toggle.addEventListener('change', () => this.updatePrices());
    }
  }

  updatePrices() {
    const isAnnual = this.toggle.checked;
    const prices = isAnnual ? this.annualPrices : this.monthlyPrices;
    const period = isAnnual ? '/ano' : '/mês';
    
    const priceElements = document.querySelectorAll('.price .amount');
    const periodElements = document.querySelectorAll('.price .period');
    
    priceElements.forEach((element, index) => {
      if (prices[index]) {
        element.textContent = prices[index];
      }
    });
    
    periodElements.forEach(element => {
      element.textContent = period;
    });
  }
}

// ====================
// FORMULÁRIO DE CONTATO
// ====================
class ContactForm {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    });
  }

  handleSubmit(e, form) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form data:', data);
    
    if (form.id === 'contact-form') {
      const message = `Olá! Meu nome é ${data.name}. ${data.message}`;
      const whatsappUrl = `https://wa.me/5516988100103?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
    
    this.showSuccessMessage(form);
  }

  showSuccessMessage(form) {
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.innerHTML = '<i class="fas fa-check"></i> Enviado!';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 3000);
  }
}

// ====================
// INICIALIZAÇÃO GERAL
// ====================
class App {
  constructor() {
    this.modules = {};
    this.init();
  }

  init() {
    this.modules.theme = new ThemeManager();
    this.modules.menu = new MobileMenu();
    this.modules.phoneCarousel = new SimplePhoneCarousel();
    this.modules.animations = new ScrollAnimations();
    this.modules.pricing = new PricingToggle();
    this.modules.contact = new ContactForm();
    
    this.setupSmoothScroll();
    this.setupPerformance();
    this.setupHeroAnimations();
    this.setupCtaAnimations();
    this.setupWhatsAppFloat();
    
    console.log('Salú - Sistema inicializado com sucesso!');
  }

setupWhatsAppFloat() {
  // Adiciona efeito de pulse contínuo ao botão WhatsApp
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    setInterval(() => {
      whatsappBtn.style.animation = 'none';
      setTimeout(() => {
        whatsappBtn.style.animation = 'pulse 2s infinite';
      }, 10);
    }, 4000);
  }
}

  setupHeroAnimations() {
    // Animação do telefone no hero (apenas em desktop)
    const heroPhone = document.querySelector('.floating-phone');
    if (heroPhone && window.innerWidth > 768) {
      const animatePhone = () => {
        const time = Date.now() / 1000;
        const floatY = Math.sin(time) * 10;
        const rotation = Math.sin(time * 0.5) * 2;
        
        heroPhone.style.transform = `translateY(${floatY}px) rotate(${rotation}deg)`;
        requestAnimationFrame(animatePhone);
      };
      animatePhone();
    }
  }

  setupCtaAnimations() {
    // Animações específicas para a seção CTA
    const ctaCards = document.querySelectorAll('.cta-card');
    ctaCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const offset = 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupPerformance() {
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.classList.remove('lazy');
            }
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
    
    // Preload de imagens importantes
    this.preloadImages([
      '/logo.png',
      '/captura1.jpg',
      '/captura2.jpg',
      '/captura3.jpg'
    ]);
  }

  preloadImages(imageUrls) {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }
}

// ====================
// INICIALIZAÇÃO DO APP
// ====================
document.addEventListener('DOMContentLoaded', () => {
  // Remove a classe 'no-js' se necessário
  document.documentElement.classList.remove('no-js');
  
  // Inicializa a aplicação
  window.app = new App();
});

// ====================
// FUNÇÃO PARA ROLAR PARA O TOPO
// ====================
function scrollToTop(e) {
  if (e) e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ====================
// TRATAMENTO DE ERROS
// ====================
window.addEventListener('error', (e) => {
  console.error('Erro detectado:', e.error);
});

// ====================
// UTILITÁRIOS ADICIONAIS
// ====================

// Adiciona classe quando a página carrega
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Animação para elementos que aparecem no scroll
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Inicializar animações de scroll quando a página carrega
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupScrollAnimations);
} else {
  setupScrollAnimations();
}

// Efeito de parallax suave (apenas em desktop)
function setupParallax() {
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }
}

// Inicializar parallax
setupParallax();

// Re-inicializar parallax em redimensionamento
window.addEventListener('resize', setupParallax);

// Animações adicionais para a nova seção CTA
function setupCtaHoverEffects() {
  const ctaCards = document.querySelectorAll('.cta-card');
  
  ctaCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.cta-card-icon');
      icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.cta-card-icon');
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// Inicializar efeitos de hover da CTA
document.addEventListener('DOMContentLoaded', setupCtaHoverEffects);