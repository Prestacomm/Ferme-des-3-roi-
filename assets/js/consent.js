/* ==========================================================================
   Gestion du consentement aux cookies et traceurs (CNIL / ePrivacy)
   - Rien de non essentiel n'est chargé avant un choix explicite.
   - Refuser est aussi simple qu'accepter ; le choix se retire à tout moment
     via « Gérer mes cookies » (pied de page).
   - Le choix est conservé 6 mois, puis redemandé.

   POUR AJOUTER UN OUTIL (statistiques, pixel, vidéo…) :
   1. passez `active: true` sur sa catégorie dans CATEGORIES ci-dessous ;
   2. insérez le service ainsi, il ne se chargera qu'après consentement :
        <script type="text/plain" data-consent-cat="stats" data-consent-src="https://…/script.js"></script>
        <iframe data-consent-cat="social" data-consent-src="https://…" hidden></iframe>
   3. mettez à jour politique-cookies.html (tableau des traceurs).
   Sous WordPress : à remplacer par un plugin de consentement (Complianz, CookieYes…).
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'f3r_consent';
  var DURATION_MS = 182 * 24 * 60 * 60 * 1000; // ~6 mois

  var CATEGORIES = [
    { id: 'maps',   active: true,  label: 'Cartes interactives',
      desc: 'Affichage de la carte Google Maps (Google peut déposer des cookies et reçoit votre adresse IP).' },
    { id: 'stats',  active: false, label: 'Mesure d\'audience',
      desc: 'Statistiques de fréquentation du site.' },
    { id: 'ads',    active: false, label: 'Publicité et réseaux',
      desc: 'Pixels et traceurs publicitaires.' },
    { id: 'social', active: false, label: 'Vidéos et publications de réseaux sociaux',
      desc: 'Contenus Instagram, Facebook ou YouTube intégrés au site.' }
  ];
  var active = CATEGORIES.filter(function (c) { return c.active; });

  /* ---------- stockage ---------- */
  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.ts || Date.now() - data.ts > DURATION_MS) { localStorage.removeItem(KEY); return null; }
      return data;
    } catch (e) { return null; }
  }
  function write(choices) {
    try { localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), choices: choices })); } catch (e) {}
  }
  function granted(cat) {
    var d = read();
    return !!(d && d.choices && d.choices[cat]);
  }

  /* ---------- activation des contenus bloqués ---------- */
  function apply() {
    document.querySelectorAll('[data-consent-cat]').forEach(function (el) {
      var cat = el.getAttribute('data-consent-cat');
      var src = el.getAttribute('data-consent-src');
      if (!src) return;
      if (granted(cat)) {
        if (el.tagName === 'SCRIPT') {
          if (el.getAttribute('data-consent-done')) return;
          var s = document.createElement('script');
          s.src = src; s.async = true;
          el.parentNode.insertBefore(s, el);
          el.setAttribute('data-consent-done', '1');
        } else if (!el.getAttribute('src')) {
          el.setAttribute('src', src);
          el.removeAttribute('hidden');
        }
      } else if (el.tagName !== 'SCRIPT' && el.getAttribute('src')) {
        el.removeAttribute('src');
        el.setAttribute('hidden', '');
      }
    });
    document.querySelectorAll('[data-consent-box]').forEach(function (box) {
      var ph = box.querySelector('.consent-placeholder');
      if (ph) ph.hidden = granted(box.getAttribute('data-consent-box'));
    });
  }

  /* ---------- interface ---------- */
  var root = null;
  function build() {
    if (root) return root;
    root = document.createElement('div');
    root.className = 'consent';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'false');
    root.setAttribute('aria-labelledby', 'consentTitle');
    root.hidden = true;
    var rows = active.map(function (c) {
      return '<label class="consent__row"><input type="checkbox" data-cat="' + c.id + '"> <span><strong>' + c.label + '</strong><br>' + c.desc + '</span></label>';
    }).join('');
    root.innerHTML =
      '<h2 id="consentTitle">Vos choix concernant les cookies</h2>' +
      '<p>Ce site utilise des services tiers (par exemple la carte Google Maps) qui peuvent déposer des cookies. ' +
      'Aucun n\'est chargé sans votre accord. Vous pouvez modifier votre choix à tout moment depuis le pied de page. ' +
      '<a href="politique-cookies.html">En savoir plus</a></p>' +
      '<div class="consent__panel" hidden>' + rows + '</div>' +
      '<div class="consent__actions">' +
        '<button type="button" class="btn btn-primary" data-act="refuse">Tout refuser</button>' +
        '<button type="button" class="btn btn-primary" data-act="accept">Tout accepter</button>' +
        '<button type="button" class="btn btn-ghost" data-act="custom">Personnaliser</button>' +
      '</div>';
    document.body.appendChild(root);

    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      var panel = root.querySelector('.consent__panel');
      if (act === 'accept' || act === 'refuse') {
        var ch = {};
        active.forEach(function (c) { ch[c.id] = (act === 'accept'); });
        save(ch);
      } else if (act === 'custom') {
        if (panel.hidden) {
          panel.hidden = false;
          b.textContent = 'Enregistrer mes choix';
          b.setAttribute('data-act', 'save');
        }
      } else if (act === 'save') {
        var ch2 = {};
        root.querySelectorAll('input[data-cat]').forEach(function (i) { ch2[i.getAttribute('data-cat')] = i.checked; });
        save(ch2);
      }
    });
    return root;
  }
  function save(choices) {
    write(choices);
    root.hidden = true;
    apply();
  }
  function open() {
    build();
    var d = read();
    root.querySelectorAll('input[data-cat]').forEach(function (i) {
      i.checked = !!(d && d.choices && d.choices[i.getAttribute('data-cat')]);
    });
    root.querySelector('.consent__panel').hidden = false;
    var custom = root.querySelector('[data-act="custom"]');
    if (custom) { custom.textContent = 'Enregistrer mes choix'; custom.setAttribute('data-act', 'save'); }
    root.hidden = false;
    var first = root.querySelector('button');
    if (first) first.focus();
  }

  /* ---------- initialisation ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    apply();

    // bouton « Afficher la carte » : consentement ciblé sur une catégorie
    document.querySelectorAll('[data-consent-grant]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var d = read();
        var ch = (d && d.choices) ? d.choices : {};
        ch[btn.getAttribute('data-consent-grant')] = true;
        write(ch);
        apply();
      });
    });

    // lien « Gérer mes cookies »
    document.querySelectorAll('[data-open-consent]').forEach(function (b) {
      b.addEventListener('click', open);
    });

    // bandeau au premier chargement, uniquement si la page contient un contenu soumis au consentement
    var needs = document.querySelector('[data-consent-cat]');
    if (needs && !read()) { build(); root.hidden = false; }
  });
})();
