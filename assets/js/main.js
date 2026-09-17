/* ==========================================================================
   FERME DES 3 ROIS — Script principal (vanilla JS, sans dépendance)
   Chaque bloc correspond à un composant simple à reproduire en WordPress
   (slider = plugin de slider, tabs = plugin d'onglets, accordéon = plugin FAQ...).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header : fond au scroll + menu mobile ---------- */
  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  function onScrollHeader(){
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScrollHeader);
  onScrollHeader();

  navToggle.addEventListener('click', function(){
    var isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mainNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Hero : slideshow automatique ---------- */
  var slidesWrap = document.getElementById('heroSlides');
  var slides = slidesWrap ? Array.prototype.slice.call(slidesWrap.querySelectorAll('.hero-slide')) : [];
  var dotsWrap = document.getElementById('heroDots');
  var current = 0;
  var heroTimer;

  if (slides.length) {
    slides.forEach(function(_, i){
      var dot = document.createElement('button');
      if (i === 0) dot.classList.add('is-active');
      dot.setAttribute('aria-label', 'Aller à la photo ' + (i+1));
      dot.addEventListener('click', function(){ goToSlide(i); resetHeroTimer(); });
      dotsWrap.appendChild(dot);
    });

    function goToSlide(index){
      slides[current].classList.remove('is-active');
      dotsWrap.children[current].classList.remove('is-active');
      current = index;
      slides[current].classList.add('is-active');
      dotsWrap.children[current].classList.add('is-active');
    }
    function nextSlide(){ goToSlide((current + 1) % slides.length); }
    function resetHeroTimer(){
      clearInterval(heroTimer);
      heroTimer = setInterval(nextSlide, 5500);
    }
    resetHeroTimer();
  }

  /* ---------- Onglets (Produits + Recettes) ---------- */
  document.querySelectorAll('.tabs-bar').forEach(function(bar){
    var buttons = Array.prototype.slice.call(bar.querySelectorAll('.tab-btn'));
    var panelsWrap = bar.parentElement;

    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var target = btn.getAttribute('data-tab');

        buttons.forEach(function(b){
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        panelsWrap.querySelectorAll(':scope > .tab-panel').forEach(function(panel){
          panel.classList.toggle('is-active', panel.id === 'tab-' + target);
        });
      });
    });
  });

  /* ---------- Accordéon points de vente ---------- */
  document.querySelectorAll('.accordion-trigger').forEach(function(trigger){
    trigger.addEventListener('click', function(){
      var item = trigger.closest('.accordion-item');
      var wasOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(function(i){
        i.classList.remove('is-open');
      });
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---------- Galerie : lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-lightbox]').forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      lightboxImg.src = link.getAttribute('href');
      lightboxImg.alt = link.querySelector('img') ? link.querySelector('img').alt : '';
      lightbox.classList.add('is-open');
    });
  });
  function closeLightbox(){ lightbox.classList.remove('is-open'); lightboxImg.src=''; }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Formulaire de contact (démo front-end) ---------- */
  var form = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // À remplacer par un envoi réel (backend, mailto ou plugin WordPress).
      formSuccess.classList.add('is-visible');
      form.reset();
    });
  }

  /* ---------- Animations au scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- Ancres : compense le header fixe ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

});
