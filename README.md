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

## Affichage automatique de toutes les vidéos

La section "Vidéos" intègre le lecteur YouTube officiel (iframe) branché sur la playlist "uploads" de la chaîne — cette playlist contient automatiquement **toutes** les vidéos publiées et se met à jour toute seule dès qu'une nouvelle vidéo sort, sans clé API, sans proxy tiers et sans aucune maintenance. C'est ce qui s'affiche par défaut.

(Note technique : une tentative initiale via le flux RSS public + un proxy CORS gratuit a été abandonnée car ce proxy s'est révélé peu fiable en test — l'iframe officielle est une solution plus robuste pour un site 100% statique.)

### Passer à des cartes personnalisées via l'API officielle (optionnel)

1. **Créer une clé API YouTube** :
   - Allez sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créez un nouveau projet
   - Activez l'API YouTube Data v3
   - Générez une clé API

2. **Configurer la clé API** :
   - Ouvrez `js/youtube.js`
   - Renseignez votre clé API dans la constante `API_KEY`
   - Le `CHANNEL_ID` est déjà configuré pour votre chaîne (`UCsjJdWuzdaBiHzaByKlDDag`)
   - Une fois une clé renseignée, le site charge des cartes vidéo personnalisées via l'API et masque l'iframe

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

### Modifier l'affichage des vidéos
Par défaut, tout vient de l'iframe YouTube (`.videos-embed-wrap` dans `index.html`, section `<!-- ── VIDEOS ── -->`) — rien à modifier, YouTube gère l'affichage. Les cartes personnalisées (`.video-card`) ne sont générées que si une clé API est configurée (voir ci-dessus) ; leur style se modifie dans `css/style.css`.

## Lancement

Ouvrez `index.html` dans votre navigateur pour lancer le site.

## Déploiement

Pour un déploiement en production :
1. Uploadez tous les fichiers sur votre serveur
2. Assurez-vous que les chemins vers les fichiers CSS et JS sont corrects
3. Configurez votre clé API YouTube pour le domaine de production
