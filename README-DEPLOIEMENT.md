# Ferme des 3 Rois — Site vitrine (maquette statique)

## Structure du projet

```
index.html                        → ENTRÉE du site : le visiteur choisit « Ferme des 3 Rois » ou « Trésors de Beauce »
ferme-des-3-rois.html             → Accueil Ferme des 3 Rois : hero, aperçu des 3 thèmes, galerie, contact
tresors-de-beauce.html            → Accueil Trésors de Beauce : même structure, hero et textes propres à la marque
la-ferme.html                     → Page « La Ferme » : Notre Histoire + Nos Engagements
nos-produits.html                 → Page « Nos Produits » : céréales, légumineuses, graines, légumes
recettes.html                     → Page « Recettes » : fiche cuisson + recettes salées/sucrées
assets/css/style.css              → tous les styles (variables de marque en haut de fichier)
assets/js/main.js                 → interactions (menu, onglets, accordéon, lightbox, formulaire, liens de la marque active)
assets/js/brand.js                → mémorise la marque choisie (Ferme des 3 Rois / Trésors de Beauce)
assets/images/logo-*.jpg          → vos vrais logos (Ferme des 3 Rois / Trésors de Beauce)
assets/images/logo-ferme-des-3-rois.png, logo-tresors-de-beauce.png → chaque logo isolé (header + écran d'entrée)
assets/images/real/*.jpg          → vos vraies photos (extraites de vos documents + ancien site)
assets/images/hero/*.jpg          → photos libres de droit du hero (voir « Crédits photo » ci-dessous)
assets/images/placeholders/*.svg  → visuels de remplacement À REMPLACER par de vraies photos
assets/docs/*.pdf                 → vos vraies fiches recette / fiche cuisson (déjà en ligne, téléchargeables)
scripts/                          → scripts utilitaires (génération des placeholders, serveur de test local)
```

Le site est désormais **multi-pages** : chaque thème (La Ferme, Nos Produits, Recettes) a sa
propre page HTML, reliée depuis le menu et depuis les 3 cartes d'aperçu de la page d'accueil.
« Où nous trouver / Contact » figure sur chacune des deux pages d'accueil de marque
(`ferme-des-3-rois.html#contact` et `tresors-de-beauce.html#contact`).

## Entrée du site et choix de la marque

- `index.html` (adresse du site) affiche l'écran d'entrée : deux grands panneaux, **Ferme des 3 Rois**
  et **Trésors de Beauce**. Un clic ouvre l'accueil de la marque. Volontairement, aucune mention
  « professionnels » ou « particuliers » : Ferme des 3 Rois est la marque des grandes surfaces, Trésors de
  Beauce celle des épiceries fines et magasins bio, ce n'est donc pas une séparation pro / particuliers.
- Dans le header de toutes les pages, la barre verte « Nos deux marques » permet de basculer à tout moment
  d'une marque à l'autre (onglet actif en blanc). Le pied de page propose aussi « Choisir une marque » (retour à l'entrée).
- Les pages La Ferme, Nos Produits, Recettes et les pages légales sont **communes** aux deux marques : elles
  reprennent le logo et les liens de la marque choisie en dernier (mémorisée 12 mois dans le navigateur, clé
  `f3r_brand`, déclarée dans `politique-cookies.html`). Sans choix préalable : Ferme des 3 Rois.
- À valider avec le client : les textes de `tresors-de-beauce.html` (titre, accroche, chapô) sont une première
  rédaction reprise des contenus existants.

Pour prévisualiser le site en local : ouvrez un terminal dans ce dossier puis lancez
`python3 -m http.server 8080` et ouvrez `http://localhost:8080`.

## Photos réelles déjà intégrées

Le site utilise maintenant de vraies photos de l'exploitation, récupérées depuis votre ancien
site tresorsdebeauce.com (`assets/images/real/`) :

- **`histoire-portrait.jpg`** (ex `tdb-engagement-1.jpg`) — vraie photo couleur de Jérémy et
  Jonathan dans un champ. Utilisée dans « Notre Histoire », la galerie, et la carte « Bio &
  certifications » de Nos Engagements.
- **`histoire-batiment.jpg`** (ex `tdb-corps-ferme.jpg`) — vraie photo du corps de ferme avec
  le clocher du Puiset. Utilisée en bannière de « Recettes » et dans la galerie.
- **`tdb-engagement-2.jpg`** — la chaîne de tri à la ferme (maïs). Carte « Circuit local ».
- **`tdb-engagement-3.jpg`** — légumineuses versées dans un sac kraft. Carte « Impact
  environnemental ».
- **`tdb-legumes-secs.jpg`** — gros plan haricots bariolés. Produit « Haricot Bariolé » + galerie.
- **`tdb-decortiques.jpg`** — tournesol décortiqué torréfié. Produit « Tournesol décortiqué » + galerie.

Ces photos sont estampillées « Maxime Ledieu » dans leurs métadonnées (photographe visiblement
mandaté pour votre marque) — sans risque à priori pour votre propre site.

⚠️ **Un fichier n'a volontairement pas été utilisé** : `tdb-farine.jpg` (farine + épis de blé)
porte un copyright **Shutterstock** explicite (« No use without permission ») dans ses
métadonnées — c'est une photo de banque d'images, pas une photo de votre exploitation. Je l'ai
laissée dans le dossier `assets/images/real/` sans la connecter au site : vérifiez la licence
Shutterstock associée à votre compte avant de l'utiliser, ou remplacez-la par une photo à vous.

La liste par département des points de vente, et les liens Facebook/Instagram (repris de votre
ancien site) restent à vérifier/compléter — voir la section suivante.

## Le hero « scroll to expand »

La photo d'accueil s'agrandit progressivement au fil du défilement jusqu'à occuper tout
l'écran, puis le titre et les boutons apparaissent par-dessus. Effet 100% CSS/JS maison
(`clip-path` animé au scroll), sans dépendance ni librairie.

**Photos du hero** : ce sont de vraies photos de la ferme — `assets/images/real/ferme-de-loin.jpg` (cadre qui s'agrandit) et `assets/images/real/moisson-2.jpg` (moissonneuse, arrière-plan flouté). Les anciennes photos Unsplash restent dans `assets/images/hero/` mais ne sont plus utilisées.

## À faire avant mise en ligne

1. **Remplacer les images placeholder restantes** (`assets/images/placeholders/`) par de
   vraies photos de l'exploitation et des produits (céréales, légumineuses, graines, légumes,
   recettes...). Elles sont utilisées dans `nos-produits.html`, `recettes.html` et
   `la-ferme.html` (carte « Agriculture durable ») — gardez les mêmes noms de fichiers pour ne
   rien casser, ou mettez à jour les balises `<img src="...">` dans le fichier concerné.
2. **Logo AB officiel** : le badge « AB » du header/hero est une reconstitution simple aux
   couleurs de la marque. Remplacez-le par le fichier officiel du logo AB (Agriculture
   Biologique) fourni par votre organisme certificateur.
3. **Points de vente** (section « Où nous trouver ») : la liste par département est un exemple
   à personnaliser avec vos vrais revendeurs.
4. **Réseaux sociaux** : Facebook et Instagram pointent maintenant vers vos vrais comptes
   (repris de tresorsdebeauce.com). YouTube pointe encore vers `#` — à compléter si vous en avez un.
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
Bricks…). Sa structure multi-pages colle d'ailleurs directement au fonctionnement de WordPress :
créez une page « La Ferme », une page « Nos Produits », une page « Recettes », et gardez « Où
nous trouver » comme section de chaque page d'accueil de marque — exactement l'arborescence de ce dossier.
L'écran d'entrée (`index.html`) devient la page d'accueil du site avec deux gros boutons/blocs
vers les deux accueils ; le sélecteur de marque du header se recrée avec un menu à deux liens.

- **Couleurs et polices** : toutes les valeurs de marque sont en haut de `assets/css/style.css`
  (section « Variables de marque ») — à reporter dans les réglages globaux du thème.
  Polices Google utilisées : **Fraunces** (titres), **Caveat** (accroches manuscrites),
  **Work Sans** (texte courant).
- **Hero « scroll to expand »** → plus complexe que les autres blocs : sous WordPress, ça
  passe par un widget "HTML personnalisé" (Elementor) ou un plugin de code (WPCode) où vous
  collez la structure HTML/CSS/JS correspondante. Alternative plus simple à gérer en page
  builder : un bandeau plein écran classique avec un slider (Elementor Pro « Slides », Smart
  Slider 3, MetaSlider).
- **Onglets Produits / Recettes** → widget "Tabs" natif d'Elementor ou plugin de tabs.
- **Accordéon points de vente** → widget "Accordion" natif.
- **Galerie + lightbox** → widget "Gallery" natif (lightbox intégrée).
- **Formulaire de contact** → Contact Form 7 ou WPForms, à styliser avec les mêmes couleurs.
- La Ferme, Nos Produits et Recettes sont chacune une page WordPress à part entière ;
  « Où nous trouver » (04) reste une section de chaque page d'accueil de marque.


## Conformité légale (à finir avant la mise en ligne)

Pages créées : `mentions-legales.html`, `cgv.html`, `politique-de-confidentialite.html`, `politique-cookies.html`,
reliées dans le pied de page de chaque page. Les informations manquantes sont repérées par des pastilles jaunes
`[À COMPLÉTER …]` : cherchez `class="todo"` dans ces fichiers.

À compléter / décider :
- raison sociale exacte, forme juridique, capital, RCS, TVA, directeur de la publication ;
- hébergeur définitif (nom, adresse, téléphone) ;
- médiateur de la consommation à choisir et à adhérer (CGV) ;
- détails des CGV : moyens et délais de paiement, livraison, taux de pénalités, tribunal compétent ;
- connecter le formulaire de contact à un envoi réel (le message de succès actuel est une démonstration) ;
- remplacer les photos de maquette (`open-*.jpg`) par vos photos ;
- vérifier la liste des points de vente (exemples non réels) ;
- relecture par un juriste avant mise en ligne.

Cookies : tout service tiers non essentiel doit passer par `assets/js/consent.js` (mode d'emploi en tête du fichier).
