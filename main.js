// Elementos do DOM
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const timelineCards = document.querySelectorAll('.timeline-card');
const timelineTrack = document.getElementById('timeline-track');
const timelinePrev = document.getElementById('timeline-prev');
const timelineNext = document.getElementById('timeline-next');
const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right');

// Efeito de rolagem no cabeçalho
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
  
  // Verifica elementos animados
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100 && elementBottom > 0) {
      element.classList.add('visible');
    }
  });
  
  // Verifica visibilidade dos cards da linha do tempo
  timelineCards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    if (cardRect.left < window.innerWidth - 100 && cardRect.right > 0) {
      card.classList.add('visible');
    }
  });
}

// Alternar menu mobile
function toggleMenu() {
  menuToggle.classList.toggle('active');
  navMenu.querySelector('.nav-list').classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// Rolagem suave para links de navegação
function smoothScroll(e) {
  e.preventDefault();
  
  // Fecha o menu mobile se estiver aberto
  if (navMenu.querySelector('.nav-list').classList.contains('active')) {
    toggleMenu();
  }
  
  // Obtém a seção de destino
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    const headerHeight = 80; // Compensa o cabeçalho fixo
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Navegação da linha do tempo
function scrollTimeline(direction) {
  const cardWidth = timelineCards[0].offsetWidth + 16; // largura do card + espaçamento
  const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
  timelineTrack.scrollLeft += scrollAmount;
}

// Efeito parallax para seções de fundo
function parallaxEffect() {
  const parallaxSections = document.querySelectorAll('.parallax-section');
  
  parallaxSections.forEach(section => {
    const scrollPosition = window.pageYOffset;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    // Só aplica o efeito quando a seção está visível
    if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
      const yPos = -(scrollPosition - sectionTop) * 0.1;
      section.style.backgroundPosition = `center ${yPos}px`;
    }
  });
}

// Inicializa a visibilidade dos cards da linha do tempo
function initTimelineCards() {
  timelineCards.forEach(card => {
    // Adiciona a classe de visível aos três primeiros cards
    if (timelineCards.indexOf(card) < 3) {
      card.classList.add('visible');
    }
  });
}

// Listeners de eventos
window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', parallaxEffect);
menuToggle.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', smoothScroll));
timelinePrev.addEventListener('click', () => scrollTimeline('prev'));
timelineNext.addEventListener('click', () => scrollTimeline('next'));

// Controla a visibilidade dos cards ao rolar a linha do tempo
timelineTrack.addEventListener('scroll', () => {
  timelineCards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    if (cardRect.left < window.innerWidth - 100 && cardRect.right > 0) {
      card.classList.add('visible');
    }
  });
});

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  handleScroll(); // Verifica a posição inicial da rolagem
  initTimelineCards();
});

// Botão voltar ao topo
const btnTopo = document.getElementById("btnTopo");
if (btnTopo) {
  window.onscroll = function () {
    // Mostra o botão só depois de rolar um terço da página
    const umTerco = document.documentElement.scrollHeight / 3;
    if (document.documentElement.scrollTop > umTerco) {
      btnTopo.style.display = "block";
    } else {
      btnTopo.style.display = "none";
    }
  };
  btnTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}