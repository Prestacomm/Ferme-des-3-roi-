/* ==========================================================================
   Marque active : « ferme » (Ferme des 3 Rois) ou « tresors » (Trésors de Beauce).
   Chargé dans le <head> (avant l'affichage) pour éviter tout clignotement du logo.
   - Les deux accueils imposent leur marque via <html data-brand="…"> et la mémorisent.
   - Les autres pages (La Ferme, Nos Produits, Recettes, pages légales) reprennent
     le dernier choix du visiteur ; par défaut : Ferme des 3 Rois.
   Stockage local = simple préférence d'affichage choisie par le visiteur, conservée
   12 mois (déclarée dans politique-cookies.html, clé « f3r_brand »).
   ========================================================================== */
(function () {
  'use strict';
  var KEY = 'f3r_brand';
  var MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
  var root = document.documentElement;
  var brand = root.getAttribute('data-brand');

  try {
    if (brand) {
      localStorage.setItem(KEY, brand + ':' + Date.now());
    } else {
      var saved = (localStorage.getItem(KEY) || '').split(':');
      if (saved[1] && Date.now() - Number(saved[1]) < MAX_AGE_MS) brand = saved[0];
    }
  } catch (e) {}

  root.setAttribute('data-brand', brand === 'tresors' ? 'tresors' : 'ferme');
})();
