// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.innerHTML = navLinks.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    if(this.getAttribute('href') === '#') return;
    
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if(navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Add shadow to header on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if(window.scrollY > 10) {
    header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});

// Logo click behavior
const logo = document.querySelector('.logo');

logo.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Verifica se já está no topo
  if(window.scrollY === 0) {
    window.location.reload();
  } else {
    // Vai para o topo e depois recarrega
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Recarrega após chegar ao topo (opcional)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
});

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');

// Verifica o tema atual
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Aplica o tema salvo
if (currentTheme === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
  icon.classList.replace('fa-moon', 'fa-sun');
} else {
  icon.classList.replace('fa-sun', 'fa-moon');
}

// Alterna o tema ao clicar
themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    icon.classList.replace('fa-sun', 'fa-moon');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  }
});

// Carousel Functionality
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;
const totalSlides = slides.length;

// Função para mostrar slide específico
function showSlide(index) {
  // Remove classe active de todos os slides e indicadores
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Adiciona classe active ao slide e indicador atual
  slides[index].classList.add('active');
  indicators[index].classList.add('active');
  
  currentSlide = index;
}

// Próximo slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Slide anterior
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Indicadores clicáveis
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    showSlide(index);
  });
});

// Auto-play (opcional - descomente se quiser)
// let carouselInterval = setInterval(nextSlide, 5000);

// Pausar auto-play ao interagir (se estiver usando auto-play)
// carouselContainer.addEventListener('mouseenter', () => {
//   clearInterval(carouselInterval);
// });

// carouselContainer.addEventListener('mouseleave', () => {
//   carouselInterval = setInterval(nextSlide, 5000);
// });

// Inicializar primeiro slide
showSlide(0);

// Garantir que as flechas mantenham posição consistente
function updateCarouselButtonsPosition() {
  const carouselContainer = document.querySelector('.carousel-container');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (carouselContainer && prevBtn && nextBtn) {
    const containerHeight = carouselContainer.offsetHeight;
    const middle = containerHeight / 2;
    
    prevBtn.style.top = `${middle}px`;
    nextBtn.style.top = `${middle}px`;
  }
}

// Executar quando a janela for redimensionada
window.addEventListener('resize', updateCarouselButtonsPosition);

// Executar quando as imagens carregarem
window.addEventListener('load', updateCarouselButtonsPosition);

// Executar quando mudar o slide (caso as imagens carreguem de forma assíncrona)
// Adicione esta linha dentro da função showSlide():
// updateCarouselButtonsPosition();

