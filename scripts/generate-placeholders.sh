#!/bin/bash
# Génère les visuels placeholder (SVG) du site Ferme des 3 Rois.
# A remplacer par de vraies photos avant mise en ligne définitive.
set -e

OUT="/Users/lorick/Desktop/SITE FERME DES 3 ROIS /assets/images/placeholders"
mkdir -p "$OUT"

make_svg() {
  local id="$1" w="$2" h="$3" c1="$4" c2="$5" emoji="$6" label="$7"
  cat > "$OUT/$id.svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="$w" height="$h" viewBox="0 0 $w $h" role="img" aria-label="$label">
  <defs>
    <linearGradient id="g-$id" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="$c1"/>
      <stop offset="100%" stop-color="$c2"/>
    </linearGradient>
    <filter id="grain-$id">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"/>
    </filter>
  </defs>
  <rect width="$w" height="$h" fill="url(#g-$id)"/>
  <rect width="$w" height="$h" filter="url(#grain-$id)"/>
  <circle cx="$((w/2))" cy="$((h/2-30))" r="$((h/6))" fill="#ffffff" fill-opacity="0.16"/>
  <text x="50%" y="$((h/2-10))" font-size="$((h/6))" text-anchor="middle" dominant-baseline="central">$emoji</text>
  <rect x="0" y="$((h-64))" width="$w" height="64" fill="#1c1c14" fill-opacity="0.32"/>
  <text x="50%" y="$((h-30))" font-family="Arial, sans-serif" font-size="20" fill="#ffffff" text-anchor="middle" font-weight="600">$label</text>
</svg>
SVG
}

# id | w | h | color1 | color2 | emoji | label
make_svg "hero-1" 1600 900 "#5B7A34" "#3E551F" "🌾" "Champs de la Ferme des 3 Rois"
make_svg "hero-2" 1600 900 "#C97F2B" "#8F5518" "🚜" "Récolte au Puiset"
make_svg "hero-3" 1600 900 "#7A5A38" "#4F3A22" "🏚️" "Bâtiments de l'exploitation"
make_svg "hero-4" 1600 900 "#4C6329" "#33421A" "🌻" "Tournesols de Beauce"

make_svg "histoire-portrait" 900 1100 "#6E8B3D" "#42561F" "👨‍🌾" "Jérémy et Jonathan dans les champs"
make_svg "histoire-batiment" 900 700 "#7A5A38" "#4F3A22" "🏡" "La ferme familiale"

make_svg "engagement-bio" 800 600 "#4C7A2E" "#325019" "🌱" "Agriculture Biologique"
make_svg "engagement-durable" 800 600 "#6E8B3D" "#42561F" "♻️" "Agriculture durable"
make_svg "engagement-circuit" 800 600 "#C97F2B" "#8F5518" "📍" "Circuit local"
make_svg "engagement-impact" 800 600 "#3E6B2E" "#254019" "🌍" "Impact environnemental"

# Céréales
make_svg "cereale-petit-epeautre" 800 600 "#E3A94B" "#B87A22" "🌾" "Petit épeautre"
make_svg "cereale-grand-epeautre" 800 600 "#DFA33F" "#B2761E" "🌾" "Grand épeautre décortiqué"
make_svg "cereale-quinoa" 800 600 "#E6B25B" "#BD8228" "🌾" "Quinoa"
make_svg "cereale-boulgour" 800 600 "#DE9C3A" "#AD7220" "🌾" "Boulgour"
make_svg "cereale-maispopcorn" 800 600 "#EAC24E" "#C08F25" "🌽" "Maïs pop-corn"

# Légumineuses - haricots
make_svg "legumineuse-flageolet" 800 600 "#8FA24A" "#5F7529" "🫘" "Haricot Flageolet"
make_svg "legumineuse-rouge" 800 600 "#A6432E" "#7A2E20" "🫘" "Haricot Rouge"
make_svg "legumineuse-bariole" 800 600 "#AE5636" "#803B24" "🫘" "Haricot Bariolé"
make_svg "legumineuse-mogex" 800 600 "#B98F63" "#8A6845" "🫘" "Haricot Blanc Mogex"
make_svg "legumineuse-lingot" 800 600 "#C6B18A" "#96805A" "🫘" "Haricot Blanc Lingot"
make_svg "legumineuse-noir" 800 600 "#4A4038" "#2C241F" "🫘" "Haricot Noir"

# Lentilles
make_svg "lentille-verte" 800 600 "#6E8B3D" "#485D28" "🟢" "Lentille Verte"
make_svg "lentille-blonde" 800 600 "#C9A876" "#9D7C50" "🟡" "Lentille Blonde"
make_svg "lentille-corail" 800 600 "#D9703D" "#AC4F24" "🟠" "Lentille Corail"
make_svg "lentille-beluga" 800 600 "#3A342E" "#211C18" "⚫" "Lentille Béluga"

# Pois
make_svg "pois-chiche" 800 600 "#D9B45C" "#AD8630" "🟡" "Pois Chiche"
make_svg "pois-casse" 800 600 "#7C9A3D" "#516724" "🟢" "Pois Cassé"

# Graines
make_svg "graine-tournesol" 800 600 "#B08D2E" "#8A6A1E" "🌻" "Tournesol décortiqué"
make_svg "graine-lin-dore" 800 600 "#C8A542" "#9C7D28" "🌾" "Lin doré"
make_svg "graine-lin-brun" 800 600 "#7A5E36" "#523E22" "🌾" "Lin brun"
make_svg "graine-chia" 800 600 "#4A4038" "#2C241F" "⚫" "Graines de Chia"

# Légumes
make_svg "legume-pomme-terre" 800 600 "#8A6B45" "#5F4A2E" "🥔" "Pommes de terre"
make_svg "legume-oignon" 800 600 "#B4457A" "#833056" "🧅" "Oignons"
make_svg "legume-courge" 800 600 "#DE8B2E" "#AD661C" "🎃" "Courges"
make_svg "legume-betterave" 800 600 "#8E2A3A" "#621C28" "🍠" "Betteraves"

# Recettes
make_svg "recette-risotto" 800 600 "#D9703D" "#AC4F24" "🍚" "Risotto de petit épeautre au chèvre"
make_svg "recette-pudding-chia" 800 600 "#D68B6E" "#B0644A" "🥣" "Pudding de graines de chia"
make_svg "recette-salade-lentilles" 800 600 "#6E8B3D" "#485D28" "🥗" "Salade de lentilles corail"
make_svg "recette-chili-haricots" 800 600 "#A6432E" "#7A2E20" "🌶️" "Chili de haricots rouges"
make_svg "recette-porridge-epeautre" 800 600 "#E3A94B" "#B87A22" "🥣" "Porridge de petit épeautre"
make_svg "recette-cookies-lin" 800 600 "#C8A542" "#9C7D28" "🍪" "Cookies aux graines de lin"

# Galerie
make_svg "galerie-1" 800 800 "#6E8B3D" "#42561F" "🌾" "Nos champs"
make_svg "galerie-2" 800 800 "#C97F2B" "#8F5518" "🚜" "Le travail de la terre"
make_svg "galerie-3" 800 800 "#A6432E" "#7A2E20" "🫘" "Nos légumineuses"
make_svg "galerie-4" 800 800 "#E3A94B" "#B87A22" "🌾" "Nos céréales"
make_svg "galerie-5" 800 800 "#4C7A2E" "#325019" "🌻" "Nos graines"
make_svg "galerie-6" 800 800 "#7A5A38" "#4F3A22" "📦" "Conditionnement à la ferme"
make_svg "galerie-7" 800 800 "#D9703D" "#AC4F24" "🍽️" "Nos produits en cuisine"
make_svg "galerie-8" 800 800 "#3E6B2E" "#254019" "🥔" "Nos légumes"

echo "Placeholders générés dans $OUT"
