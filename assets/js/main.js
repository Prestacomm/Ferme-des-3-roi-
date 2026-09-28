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

  function setNavOpen(isOpen){
    mainNav.classList.toggle('open', isOpen);
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  }

  navToggle.addEventListener('click', function(){
    setNavOpen(!mainNav.classList.contains('open'));
  });
  mainNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){ setNavOpen(false); });
  });
  document.addEventListener('click', function(e){
    if (mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      setNavOpen(false);
    }
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && mainNav.classList.contains('open')) setNavOpen(false);
  });

  /* ---------- Hero : la photo s'agrandit au fil du défilement ---------- */
  var scrollHero = document.querySelector('.scroll-hero');
  var heroFrame = document.getElementById('scrollHeroFrame');
  var heroGradient = document.getElementById('scrollHeroGradient');
  var heroLabel = document.getElementById('scrollHeroLabel');
  var heroContent = document.getElementById('scrollHeroContent');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (scrollHero && heroFrame && !reduceMotion) {
    var easeOutCubic = function(t){ return 1 - Math.pow(1 - t, 3); };
    var clamp01 = function(v){ return Math.max(0, Math.min(1, v)); };
    var ticking = false;

    function insetsFor(){
      var mobile = window.innerWidth <= 720;
      return mobile
        ? { v: 9, h: 8, r: 20 }   // vh / vw / px sur mobile
        : { v: 14, h: 18, r: 32 }; // vh / vw / px sur desktop
    }

    function renderHero(){
      ticking = false;
      var rect = scrollHero.getBoundingClientRect();
      var scrollable = rect.height - window.innerHeight;
      var raw = scrollable > 0 ? clamp01(-rect.top / scrollable) : (rect.top <= 0 ? 1 : 0);

      var start = insetsFor();
      var expand = easeOutCubic(clamp01(raw / 0.65));           // 0 -> 1 sur les 65% premiers
      var reveal = clamp01((raw - 0.55) / 0.3);                  // 0 -> 1 entre 55% et 85%
      var labelOpacity = 1 - clamp01(raw / 0.22);

      var v = start.v * (1 - expand);
      var h = start.h * (1 - expand);
      var r = start.r * (1 - expand);
      heroFrame.style.clipPath = 'inset(' + v + 'vh ' + h + 'vw round ' + r + 'px)';

      if (heroGradient) heroGradient.style.opacity = String(0.35 + 0.55 * expand);
      if (heroLabel){
        heroLabel.style.opacity = String(labelOpacity);
        heroLabel.style.transform = 'translateY(' + (-24 * (1 - labelOpacity)) + 'px)';
        heroLabel.style.pointerEvents = labelOpacity < 0.05 ? 'none' : 'auto';
      }
      if (heroContent){
        heroContent.style.opacity = String(reveal);
        heroContent.style.transform = 'translateY(' + (28 * (1 - reveal)) + 'px)';
      }
    }

    function requestHeroRender(){
      if (!ticking){ ticking = true; requestAnimationFrame(renderHero); }
    }

    window.addEventListener('scroll', requestHeroRender, { passive: true });
    window.addEventListener('resize', requestHeroRender);
    renderHero();
  } else if (heroFrame) {
    // Mouvement réduit : on affiche directement l'état final, sans animation.
    heroFrame.style.clipPath = 'none';
    if (heroContent){ heroContent.style.opacity = '1'; heroContent.style.transform = 'none'; }
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
