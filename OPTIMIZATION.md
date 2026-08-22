# AURA++ — Optimisation des performances

## 1. Sections lazy-loadées

Toutes les sections HTML (sauf Hero) sont maintenant chargées dynamiquement via `React.lazy` + `Suspense`. Cela réduit le bundle initial et accélère le First Contentful Paint.

Pour ajouter une nouvelle section, suivez le pattern dans `src/routes/index.tsx`.

## 2. Skeleton screens

Un composant `SectionSkeleton` (`src/components/sections/SectionSkeleton.tsx`) affiche un placeholder pendant le chargement des sections lazy.

## 3. Preloader global

Un `Preloader` (`src/components/ui/Preloader.tsx`) couvre la page pendant le chargement initial et disparaît automatiquement quand `window` émet l'événement `load`.

## 4. Optimisation des images

Un script automatique permet de redimensionner et compresser les images du dossier `public/` :

```bash
npm run optimize-assets
```

Ce script :

- Redimensionne les images > 50 KB à 1024 px maximum (coté le plus long)
- Convertit les JPG en JPEG progressif (qualité 80%)
- Optimise les PNG (compression maximale)
- Skip les fichiers qui ne gagnent pas de place

Les originaux ne sont pas sauvegardés automatiquement. Si besoin, sauvegardez `public/` avant de lancer le script.

## 5. Optimisation des modèles 3D

Les fichiers `.glb` dans `public/3D/` sont les plus gros goulots d'étranglement. Voici comment les optimiser :

### a) Réduction de polygones

Ouvrez le modèle dans Blender et appliquez un modifier **Decimate** pour réduire le nombre de faces. Visez < 50 000 triangles pour les props de scène.

### b) Compression de géométrie (Draco)

```bash
npm run optimize-3d
```

(Ce script utilise `@gltf-transform/cli`. En cas d'erreur `colourspace: parameter space not set` sur Windows, utilisez la version desktop de gltf-transform ou un service en ligne.)

### c) Compression de textures

Utilisez [gltf.report](https://gltf.report/) pour :

- Réencoder les textures en WebP/AVIF
- Réduire leur résolution à 1024 px ou 2048 px
- Générer des KTX2 avec Basis Universal pour un chargement GPU direct

### d) Remplacement du modèle le plus lourd

`city_for_my_game.glb` fait 88 MB. C'est normalement lazy-loadé, mais c'est quand même très lourd. Si la scène Le Noyau peut utiliser une version simplifiée, remplacez simplement le fichier dans `public/3D/`.

## 6. Bonnes pratiques

- **Ne jamais importer statiquement** une section entière si elle n'est pas dans le viewport initial. Toujours préférer `React.lazy`.
- **Viser < 100 KB** pour le bundle initial (hors Three.js). Le lazy loading des sections aide déjà beaucoup.
- **Tester sur un réseau lent** (DevTools → Network → Slow 3G) pour vérifier le temps de chargement.
- **Surveiller les tailles de bundle** après chaque modification avec `npm run build`.
