# NOUBASRALABTECH - Site Web

## Structure du projet

```
site-noubasralabtech/
├── index.html              (fichier d'entrée principal)
├── css/
│   └── style.css          (styles CSS avec Times New Roman)
├── js/
│   ├── script.js          (fonctionnalités principales)
│   └── youtube.js         (intégration YouTube API)
├── assets/               (vide, pour les futures ressources)
└── html/
    └── noubasralabtech.html (fichier original)
```

## Réseaux sociaux

Les liens suivants sont déjà configurés dans le site (nav, hero, footer, section Réseaux) :
- YouTube : https://www.youtube.com/@NLABTECHOFFICIEL
- Facebook : https://www.facebook.com/profile.php?id=61580141431218

## Configuration YouTube API (optionnel)

Par défaut, le site affiche les 3 vidéos statiques codées dans `index.html` et les rend cliquables vers votre chaîne YouTube — aucune clé API n'est requise pour que le site fonctionne.

Pour charger automatiquement les dernières vidéos de votre chaîne à la place :

1. **Créer une clé API YouTube** :
   - Allez sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créez un nouveau projet
   - Activez l'API YouTube Data v3
   - Générez une clé API

2. **Configurer la clé API** :
   - Ouvrez `js/youtube.js`
   - Renseignez votre clé API dans la constante `API_KEY`
   - Le `CHANNEL_ID` est déjà configuré pour votre chaîne (`UCsjJdWuzdaBiHzaByKlDDag`)

## Fonctionnalités

- **Design moderne** avec police Times New Roman
- **Intégration YouTube** pour charger automatiquement vos vidéos
- **Animations fluides** et interactions
- **Responsive** pour mobile et desktop
- **Cursor personnalisé** avec effet de suivi

## Personnalisation

### Modifier les couleurs
Dans `css/style.css`, modifiez les variables CSS dans `:root` :
```css
:root {
  --blue-deep: #0a1628;
  --accent: #00BFFF;
  --yt-red: #FF0000;
  /* etc. */
}
```

### Modifier les vidéos statiques
Tant qu'aucune clé API n'est configurée, éditez directement les 3 cartes vidéo dans la section `<!-- ── VIDEOS ── -->` de `index.html` (titre, tag, date).

## Lancement

Ouvrez `index.html` dans votre navigateur pour lancer le site.

## Déploiement

Pour un déploiement en production :
1. Uploadez tous les fichiers sur votre serveur
2. Assurez-vous que les chemins vers les fichiers CSS et JS sont corrects
3. Configurez votre clé API YouTube pour le domaine de production
