# AURA++ — Reproduction d'une expérience Web 3D immersive de référence

## 1. OBJECTIF DU PROJET

Je veux transformer le site AURA++ en une **expérience web immersive, cinématique et interactive**, inspirée très précisément de la vidéo de référence fournie dans le projet.

La vidéo de référence n'est PAS une simple inspiration esthétique.

Elle constitue la référence principale pour :

- la structure de navigation ;
- les transitions ;
- le rythme ;
- le comportement de la caméra ;
- la profondeur 3D ;
- la composition visuelle ;
- les animations ;
- la relation entre le contenu HTML et le canvas 3D ;
- la manière dont les différentes sections sont révélées.

Le résultat final doit donner l'impression que l'utilisateur **navigue dans un univers numérique 3D**, et non qu'il visite un site web traditionnel.

### Règle fondamentale

NE PAS créer :

- une landing page classique ;
- une grille de cartes avec quelques effets 3D ;
- un dashboard SaaS ;
- un site avec simplement un background animé ;
- des sections statiques séparées ;
- des animations génériques de type Framer Motion.

Créer à la place :

> une expérience WebGL interactive dans laquelle la navigation contrôle une scène 3D persistante.

Le canvas 3D doit être un élément CENTRAL du site.

---

# 2. RÉFÉRENCE VISUELLE

La vidéo de référence doit être considérée comme le storyboard principal.

Elle présente une interface futuriste extrêmement sombre avec :

- noir profond ;
- rouge incandescent ;
- orange énergétique ;
- surfaces métalliques ;
- verre sombre ;
- lumière volumétrique ;
- bloom ;
- particules ;
- structures géométriques ;
- interfaces HUD ;
- éléments 3D industriels ;
- architecture numérique ;
- profondeur cinématique.

Pour AURA++, conserver cette logique mais adapter complètement l'identité graphique à AURA++.

### Palette AURA++

Utiliser principalement :

- #050507 — noir profond
- #080B12 — noir bleuté
- bleu électrique
- violet électrique
- amber/orange AURA++
- blanc froid
- gris métallique

Le rouge/orange dominant de la vidéo doit être remplacé principalement par le langage visuel AURA++ :

**Electric Blue + Deep Violet + Amber**

L'orange/amber doit être utilisé comme couleur d'accent et non comme couleur dominante.

---

# 3. STACK TECHNIQUE

Le projet doit utiliser une architecture moderne et performante.

Priorité :

- React
- TypeScript
- Three.js
- React Three Fiber
- @react-three/drei
- Framer Motion ou GSAP pour les animations DOM
- éventuellement GSAP ScrollTrigger
- Lenis pour le smooth scrolling
- postprocessing pour Bloom / vignette / aberration chromatique si nécessaire

Le canvas doit rester performant.

Éviter de multiplier inutilement les Canvas Three.js.

Utiliser idéalement :

```tsx
<Canvas>
  <Scene />
</Canvas>
```

comme scène persistante globale.

---

# 4. ARCHITECTURE DU SITE

Créer une structure conceptuellement proche de :

```text
AURA++
│
├── Global 3D Canvas
│
├── HUD Navigation
│
├── Hero / Introduction
│
├── Universe / Vision
│
├── Projects
│
├── Technology
│
├── Team
│
└── Contact / Final CTA
```

Mais ATTENTION :

Ces sections ne doivent pas être simplement empilées comme des sections HTML indépendantes.

La scène 3D doit évoluer lorsque l'utilisateur navigue.

Exemple :

```text
HOME
   ↓
Camera moves forward
   ↓
3D environment changes
   ↓
AURA++ object appears
   ↓
TEXT appears
   ↓
PROJECTS
   ↓
Camera rotates
   ↓
New 3D structures appear
```

L'utilisateur doit avoir l'impression de voyager dans un même univers.

---

# 5. HERO — AURA++ INTRODUCTION

La première scène doit être spectaculaire mais minimaliste.

Écran presque entièrement noir.

Au centre :

un objet 3D AURA++ flottant.

L'objet peut être :

- un symbole AURA++ ;
- une structure triangulaire ;
- un artefact technologique ;
- une géométrie métallique complexe.

Il doit avoir :

- métal sombre ;
- verre ;
- lignes lumineuses ;
- énergie interne ;
- petits détails mécaniques ;
- reflets réalistes.

Autour :

- anneaux orbitaux ;
- particules ;
- petites sphères ;
- fragments géométriques ;
- très légère poussière volumétrique.

Le logo AURA++ peut être utilisé comme point focal.

---

# 6. CAMERA 3D

La caméra est l'un des éléments les plus importants.

Elle ne doit jamais être complètement statique.

Créer une caméra cinématique capable de :

- avancer ;
- reculer ;
- tourner ;
- effectuer de légères rotations ;
- changer de hauteur ;
- effectuer des dolly shots ;
- effectuer des rotations autour d'objets ;
- traverser certains environnements.

Le mouvement doit être lent, fluide et intentionnel.

NE PAS faire de mouvements rapides ou de rotations excessives.

Le sentiment recherché :

> caméra de film + exploration d'un environnement numérique.

---

# 7. NAVIGATION HUD

Créer une navigation inspirée de celle visible dans la vidéo.

Elle doit être :

- très fine ;
- compacte ;
- minimaliste ;
- semi-transparente ;
- flottante ;
- futuriste ;
- discrète.

Position :

```text
TOP LEFT
AURA++

                 HOME   UNIVERSE   PROJECTS   TECHNOLOGY   TEAM
```

Utiliser :

- bordures fines ;
- glassmorphism très léger ;
- petits pictogrammes ;
- micro-indicateurs ;
- état actif lumineux.

L'élément actif doit être facilement identifiable.

Pas de grosse navbar classique.

Pas de gros bouton hamburger moderne.

La navigation doit ressembler à une **interface HUD d'un système futuriste**.

---

# 8. TRANSITIONS ENTRE SECTIONS

C'est un point CRITIQUE.

Lorsqu'on clique sur une navigation :

NE PAS simplement faire :

```text
display:none
```

puis afficher une autre section.

Créer une transition cinématique.

Exemple :

HOME → PROJECTS

```text
1. le texte disparaît progressivement
2. la caméra commence à avancer
3. les particules accélèrent légèrement
4. l'objet principal se déplace
5. la lumière change
6. de nouvelles structures 3D apparaissent
7. la caméra arrive dans une nouvelle zone
8. le nouveau contenu apparaît
```

Le tout doit être fluide.

---

# 9. ENVIRONNEMENT 3D

Créer un environnement futuriste inspiré de :

- laboratoire numérique ;
- architecture cyberpunk ;
- station spatiale ;
- réseau informatique physique ;
- ville futuriste abstraite ;
- structures industrielles ;
- circuits imprimés géants ;
- monolithes ;
- plateformes flottantes.

Éviter le cyberpunk cliché avec :

- pluie ;
- néons partout ;
- panneaux japonais ;
- voitures volantes partout.

AURA++ doit être plus premium et technologique.

Référence mentale :

```text
Cyberpunk
+
Industrial Design
+
Space Technology
+
Apple-level minimalism
+
Sci-fi cinematic UI
```

---

# 10. OBJETS 3D À UTILISER

Prévoir une bibliothèque d'objets réutilisables.

Créer notamment :

### AURA Core

Objet central AURA++.

```text
AuraCore.tsx
```

Caractéristiques :

- géométrie complexe ;
- métal ;
- verre ;
- émission lumineuse ;
- rotation lente ;
- particules autour.

---

### Floating Platforms

```text
FloatingPlatform.tsx
```

Plateformes circulaires ou hexagonales.

Avec :

- métal sombre ;
- anneaux lumineux ;
- petits détails mécaniques ;
- lumière bleue/amber.

---

### Energy Rings

```text
EnergyRing.tsx
```

Anneaux orbitaux.

Animation :

```text
rotation
pulse
light intensity
```

---

### Data Cubes

```text
DataCube.tsx
```

Petits cubes holographiques.

Utilisation :

- décoration ;
- navigation ;
- transition ;
- environnement.

---

### Crystal / Energy Objects

```text
EnergyCrystal.tsx
```

Cristaux ou structures géométriques avec :

- verre ;
- émission ;
- lumière interne ;
- refraction si performant.

---

### Floating Particles

```text
ParticleField.tsx
```

Créer un champ de particules très subtil.

Les particules doivent réagir légèrement :

- à la caméra ;
- au scroll ;
- aux transitions.

---

### Digital Structures

Créer des structures verticales semblables à des bâtiments ou serveurs futuristes.

```text
DigitalArchitecture.tsx
```

Utiliser :

- blocs ;
- lignes lumineuses ;
- panneaux ;
- fenêtres ;
- grilles ;
- modules.

---

# 11. ASSETS EXISTANTS AURA++

Des assets AURA++ ont déjà été générés pour le projet.

Ils doivent être centralisés dans :

```text
/public/assets/aura/
```

Organisation recommandée :

```text
public/
└── assets/
    └── aura/
        ├── logo/
        ├── 3d/
        ├── environments/
        ├── textures/
        ├── ui/
        ├── particles/
        └── references/
```

Les images de référence actuellement disponibles doivent être considérées comme des **références artistiques et assets de support**, pas comme des éléments à simplement afficher tels quels.

Assets disponibles actuellement :

```text
a_high_detail_3d_sci_fi_render_on_a_dark_backgroun.png
```

→ représentation 3D du symbole AURA++ avec plateforme.

```text
a_sleek_futuristic_sci_fi_ui_button_navbar_compon.png
```

→ référence de navigation HUD.

```text
a_wide_futuristic_sci_fi_ui_dashboard_card_bann.png
```

→ référence de carte/interface futuriste.

```text
wide_high_detail_sci_fi_cyberpunk_3d_asset_sheet.png
```

→ planche de références contenant plusieurs objets AURA++.

IMPORTANT :

Ne pas utiliser ces planches comme simples backgrounds.

S'en servir pour reproduire leurs formes et leur langage visuel en véritables composants 3D lorsque c'est pertinent.

---

# 12. SI DES MODÈLES 3D SONT NÉCESSAIRES

Privilégier des modèles `.glb` / `.gltf`.

Architecture :

```text
public/assets/aura/3d/
```

Exemple :

```text
aura-core.glb
floating-platform.glb
digital-monolith.glb
energy-crystal.glb
data-cube.glb
```

Charger avec :

```tsx
useGLTF();
```

et mettre en cache les modèles.

Si aucun modèle n'est disponible, créer certains éléments procéduralement avec Three.js.

Ne pas remplacer un objet complexe par une simple primitive si cela détruit le rendu visuel.

---

# 13. MATÉRIAUX

Créer un langage de matériaux cohérent.

### Dark Metal

Métal presque noir :

```text
metalness: 0.85 - 1
roughness: 0.18 - 0.35
```

### Dark Glass

```text
transmission
roughness faible
IOR réaliste
```

### Energy Material

Utiliser :

```text
emissive
emissiveIntensity
```

avec :

- blue
- violet
- amber

### Holographic Material

Pour certains éléments :

- transparence ;
- fresnel ;
- glow ;
- légère iridescence.

---

# 14. LIGHTING

Le lighting doit être cinématique.

Utiliser plusieurs sources :

```text
Key Light
Rim Light
Blue Fill
Amber Accent
Environment Light
```

La lumière doit être principalement contrôlée par la scène.

Éviter une scène uniformément éclairée.

Les objets doivent sortir de l'obscurité progressivement.

---

# 15. POST PROCESSING

Ajouter si nécessaire :

- Bloom
- Vignette
- Chromatic Aberration très légère
- Noise / Film Grain très subtil
- Depth of Field ponctuel

ATTENTION :

Ne pas transformer le site en démonstration d'effets.

Le post-processing doit rester subtil.

---

# 16. TYPOGRAPHIE

La typographie doit être :

- géométrique ;
- futuriste ;
- très propre ;
- fine ;
- avec beaucoup d'espace.

Titres :

```text
AURA++
BUILD THE FUTURE
DIGITAL SYSTEMS
INTELLIGENT INFRASTRUCTURE
```

Éviter les grosses polices cyberpunk caricaturales.

Les titres doivent ressembler à une interface technologique premium.

---

# 17. TEXTES DANS L'ESPACE 3D

Certains textes peuvent être directement intégrés dans la scène.

Utiliser :

```tsx
<Text />
```

de `@react-three/drei`.

Exemple :

```text
AURA++
BUILD THE FUTURE
```

Le texte doit parfois flotter devant ou derrière les objets.

Créer de la profondeur entre :

```text
foreground
3D object
text
background
```

---

# 18. SECTION PROJECTS

La section Projects ne doit pas devenir une grille traditionnelle.

Créer une architecture 3D où plusieurs projets sont représentés par des objets / modules.

Exemple :

```text
          PROJECT 01
              ◇

PROJECT 02              PROJECT 03

              AURA CORE
```

La caméra peut naviguer entre les projets.

Lorsqu'un projet est sélectionné :

```text
camera moves
object becomes larger
lighting changes
information panel appears
```

---

# 19. INTERACTION SOURIS

La scène doit réagir subtilement à la souris.

Créer :

```text
mouse parallax
camera smoothing
object rotation
particle displacement
light movement
```

Mais très légèrement.

L'utilisateur doit sentir que l'environnement est vivant.

---

# 20. SCROLL

Le scroll est un contrôleur de timeline.

Ne pas faire simplement défiler verticalement du HTML.

Créer un système :

```text
scroll progress
      ↓
camera timeline
      ↓
scene state
      ↓
object transforms
      ↓
lighting
      ↓
UI
```

Exemple :

```tsx
const progress = scrollProgress;
camera.position.z = ...
auraCore.rotation.y = ...
platform.position.y = ...
```

Mais utiliser une vraie timeline interpolée et smoothée plutôt que des valeurs brutes.

---

# 21. RESPONSIVE

Desktop first.

La version desktop doit être extrêmement travaillée.

Pour tablette/mobile :

réduire :

- nombre de particules ;
- résolution du canvas ;
- complexité des modèles ;
- post-processing.

Mais conserver l'identité.

Ne jamais casser le layout.

---

# 22. PERFORMANCE

Objectif :

```text
60 FPS desktop
```

Prévoir :

- instancing ;
- LOD si nécessaire ;
- compression des textures ;
- Draco pour les modèles GLB ;
- lazy loading ;
- disposal correct des ressources ;
- limitation du DPR ;
- réduction des particules sur mobile.

Ne jamais charger 20 modèles 3D lourds immédiatement.

---

# 23. ARCHITECTURE REACT

Organiser le code proprement.

Exemple :

```text
src/
├── components/
│   ├── 3d/
│   │   ├── AuraCore.tsx
│   │   ├── FloatingPlatform.tsx
│   │   ├── EnergyRing.tsx
│   │   ├── DataCube.tsx
│   │   ├── EnergyCrystal.tsx
│   │   ├── DigitalArchitecture.tsx
│   │   ├── ParticleField.tsx
│   │   └── SceneEnvironment.tsx
│   │
│   ├── hud/
│   │   ├── Navigation.tsx
│   │   ├── HUDLabel.tsx
│   │   ├── SystemIndicator.tsx
│   │   └── ProgressIndicator.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Universe.tsx
│   │   ├── Projects.tsx
│   │   ├── Technology.tsx
│   │   ├── Team.tsx
│   │   └── Contact.tsx
│   │
│   └── transitions/
│       └── SceneTransition.tsx
│
├── scenes/
│   ├── SceneManager.tsx
│   ├── HeroScene.tsx
│   ├── UniverseScene.tsx
│   ├── ProjectsScene.tsx
│   └── TechnologyScene.tsx
│
├── hooks/
│   ├── useSceneProgress.ts
│   ├── useMouseParallax.ts
│   └── useSmoothScroll.ts
│
└── config/
    └── scenes.ts
```

---

# 24. SCENE MANAGER

Créer un système central :

```tsx
<SceneManager />
```

qui connaît l'état actuel :

```ts
type Scene = "hero" | "universe" | "projects" | "technology" | "team" | "contact";
```

Chaque scène doit pouvoir contrôler :

```text
camera
objects
lighting
particles
environment
UI
```

sans détruire le Canvas.

---

# 25. DESIGN SYSTEM AURA++

Créer des composants réutilisables :

```text
AuraButton
AuraCard
AuraBadge
AuraNavigation
AuraPanel
AuraIndicator
AuraProgress
AuraLabel
AuraDivider
AuraIcon
```

Tous doivent respecter le même langage :

```text
dark glass
thin borders
electric blue
violet
amber
soft glow
precise geometry
```

---

# 26. NE PAS UTILISER D'ASSETS GÉNÉRIQUES

Ne pas importer automatiquement des assets qui donnent l'impression d'un template IA générique.

Éviter :

- néons aléatoires ;
- voitures cyberpunk génériques ;
- villes cyberpunk génériques ;
- robots génériques ;
- HUD trop chargé ;
- gradients excessifs ;
- glassmorphism classique ;
- effets de particules partout.

Tout doit avoir une direction artistique cohérente AURA++.

---

# 27. IMPORTANT — NE PAS COPIER L'IMAGE, REPRODUIRE LE COMPORTEMENT

La priorité est :

```text
VIDEO REFERENCE
       ↓
VISUAL LANGUAGE
       ↓
CAMERA MOVEMENT
       ↓
SCENE TRANSITIONS
       ↓
3D INTERACTION
       ↓
AURA++ BRANDING
```

et non :

```text
IMAGE
↓
CSS
↓
copie statique
```

Je veux reproduire l'expérience.

---

# 28. LIVRABLE FINAL

Le livrable doit être un site AURA++ fonctionnel avec :

### Navigation

- navigation HUD ;
- état actif ;
- navigation clavier si pertinent ;
- navigation souris ;
- scroll navigation.

### 3D

- scène Three.js persistante ;
- objets 3D ;
- caméra cinématique ;
- lumière dynamique ;
- particules ;
- matériaux réalistes ;
- profondeur.

### Animations

- entrée ;
- sortie ;
- transitions ;
- caméra ;
- objets ;
- lumière ;
- texte ;
- UI.

### Responsive

- desktop ;
- tablet ;
- mobile.

### Performance

- 60 FPS desktop cible ;
- lazy loading ;
- optimisation des modèles ;
- réduction automatique de qualité sur mobile.

---

# 29. MÉTHODE DE DÉVELOPPEMENT

NE PAS générer tout le site d'un seul coup.

Procéder par étapes.

## PHASE 1

Créer uniquement :

```text
Canvas
+
Camera
+
Lighting
+
AuraCore
+
ParticleField
+
HUD Navigation
```

Objectif :

obtenir une scène hero extrêmement qualitative.

---

## PHASE 2

Créer la timeline de navigation :

```text
HOME
→ UNIVERSE
→ PROJECTS
→ TECHNOLOGY
→ TEAM
→ CONTACT
```

avec de vraies transitions caméra.

---

## PHASE 3

Créer les environnements secondaires.

---

## PHASE 4

Créer les interfaces HTML/HUD.

---

## PHASE 5

Ajouter les interactions souris et scroll.

---

## PHASE 6

Optimiser.

---

# 30. CRITÈRE DE RÉUSSITE

À la fin, lorsque quelqu'un ouvre AURA++ il doit immédiatement avoir cette impression :

> "Je ne suis pas sur une landing page. Je suis entré dans un système numérique."

Le site doit être :

**cinématique + premium + mystérieux + technologique + immersif + minimaliste.**

La 3D n'est pas une décoration.

**La 3D EST l'interface.**

Commence maintenant par inspecter le projet existant, identifier la stack actuelle et les assets déjà présents.

Ne remplace pas inutilement l'architecture existante.

Ensuite, implémente la PHASE 1 uniquement et montre une première version fonctionnelle avant de passer aux autres scènes.
