# Ferme des 3 Rois — Site vitrine (maquette statique)

## Structure du projet

```
index.html                 → toute la page (une seule page, sections ancrées)
assets/css/style.css       → tous les styles (variables de marque en haut de fichier)
assets/js/main.js          → interactions (slider, onglets, accordéon, lightbox, formulaire)
assets/images/logo-*.jpg   → vos vrais logos (Ferme des 3 Rois / Trésors de Beauce)
assets/images/real/*.jpg   → vos vraies photos extraites de vos documents (portrait + corps de ferme)
assets/images/placeholders/*.svg → visuels de remplacement À REMPLACER par de vraies photos
assets/docs/*.pdf          → vos vraies fiches recette / fiche cuisson (déjà en ligne, téléchargeables)
scripts/                   → scripts utilitaires (génération des placeholders, serveur de test local)
```

Pour prévisualiser le site en local : ouvrez un terminal dans ce dossier puis lancez
`python3 -m http.server 8080` et ouvrez `http://localhost:8080`.

## Photos réelles déjà intégrées

Deux vraies images ont été extraites de vos documents (`assets/images/real/`) et sont déjà
utilisées sur le site :

- **`histoire-portrait.jpg`** — Jérémy & Jonathan, extraite de l'étiquette du bocal « Pois
  Chiches au naturel », recadrée et mise en ton (duotone vert/crème). Utilisée dans la section
  « Notre Histoire » et en photo vedette de la galerie.
- **`histoire-batiment.jpg`** — le croquis du corps de ferme, extrait du fond de sachet 400g.
  Utilisé en bannière de la section « Recettes » et dans la galerie.

Ce sont les deux seuls visuels photographiques présents dans les documents fournis ; leur
définition d'origine est modeste (issus de fonds d'emballage), donc un peu douce une fois
agrandie — largement suffisant en l'état, mais idéalement à remplacer par les fichiers sources
haute définition si vous les avez, ou par de vraies photos prises sur l'exploitation.

## À faire avant mise en ligne

1. **Remplacer les images placeholder restantes** (`assets/images/placeholders/`) par de
   vraies photos de l'exploitation et des produits (céréales, légumineuses, graines, légumes,
   diapositives du bandeau hero, recettes...). Gardez les mêmes noms de fichiers pour ne rien
   casser, ou mettez à jour les balises `<img src="...">` dans `index.html`.
2. **Logo AB officiel** : le badge « AB » du header/hero est une reconstitution simple aux
   couleurs de la marque. Remplacez-le par le fichier officiel du logo AB (Agriculture
   Biologique) fourni par votre organisme certificateur.
3. **Points de vente** (section « Où nous trouver ») : la liste par département est un exemple
   à personnaliser avec vos vrais revendeurs.
4. **Réseaux sociaux** : les liens Facebook / Instagram / YouTube pointent vers `#` — à
   remplacer par vos vraies URLs.
5. **Formulaire de contact** : c'est une démo front-end (aucun email n'est réellement envoyé).
   À connecter à un vrai service d'envoi (backend, formsubmit.co, etc.) — ou, sous WordPress,
   à un plugin comme Contact Form 7 / WPForms.

## Redirection des deux noms de domaine

Le site doit être joignable en tapant **soit** `www.fermedes3rois.com` **soit**
`www.tresorsdebeauce.com`, et dans les deux cas afficher `www.fermedes3rois.com`.
Cela ne se configure pas dans les fichiers du site : c'est un réglage à faire chez votre
hébergeur / registrar, en deux temps :

1. Faites pointer les deux noms de domaine (DNS) vers le même hébergement.
2. Configurez une **redirection 301** de `tresorsdebeauce.com` vers `https://www.fermedes3rois.com`
   (et pareil pour `www.tresorsdebeauce.com`). La plupart des hébergeurs proposent cette
   redirection dans leur panneau de gestion de domaine ; sous WordPress, un plugin comme
   « Redirection » permet aussi de la gérer si les deux domaines sont ajoutés au même site.

## Reproduire ce design sous WordPress

Le site a été volontairement conçu simple à recréer avec un page builder (Elementor, Divi,
Bricks…) :

- **Couleurs et polices** : toutes les valeurs de marque sont en haut de `assets/css/style.css`
  (section « Variables de marque ») — à reporter dans les réglages globaux du thème.
  Polices Google utilisées : **Fraunces** (titres), **Caveat** (accroches manuscrites),
  **Work Sans** (texte courant).
- **Bandeau hero plein écran avec photos déroulantes** → un slider plein écran (Elementor
  Pro « Slides », ou plugin Smart Slider 3 / MetaSlider).
- **Onglets Produits / Recettes** → widget "Tabs" natif d'Elementor ou plugin de tabs.
- **Accordéon points de vente** → widget "Accordion" natif.
- **Galerie + lightbox** → widget "Gallery" natif (lightbox intégrée).
- **Formulaire de contact** → Contact Form 7 ou WPForms, à styliser avec les mêmes couleurs.
- Chaque section numérotée (01 La Ferme, 02 Nos Produits, 03 Recettes, 04 Où nous trouver)
  correspond à une section de page dans le page builder.
