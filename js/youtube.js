// YouTube API integration
const API_KEY = ''; // Renseignez votre propre clé API YouTube Data v3 pour charger les vidéos automatiquement
const CHANNEL_ID = 'UCsjJdWuzdaBiHzaByKlDDag';
const CHANNEL_URL = 'https://www.youtube.com/@NLABTECHOFFICIEL';

let videos = [];

// Charger les vidéos depuis YouTube API
async function loadYouTubeVideos() {
  // Sans clé API configurée, on garde les vidéos statiques déjà présentes
  // dans la page et on les rend cliquables vers la chaîne YouTube.
  if (!API_KEY) {
    linkStaticVideoCards();
    return;
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`);
    const data = await response.json();

    if (data.items && data.items.length) {
      videos = data.items;
      displayVideos();
    } else {
      linkStaticVideoCards();
    }
  } catch (error) {
    console.error('Erreur lors du chargement des vidéos:', error);
    // En cas d'erreur API, on garde les vidéos statiques plutôt que d'afficher des données factices
    linkStaticVideoCards();
  }
}

// Rendre les cartes vidéo statiques (déjà dans le HTML) cliquables vers la chaîne
function linkStaticVideoCards() {
  document.querySelectorAll('.videos-grid .video-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => window.open(CHANNEL_URL, '_blank', 'noopener'));
  });
}

// Afficher les vidéos dans la grille
function displayVideos() {
  const videosGrid = document.querySelector('.videos-grid');
  if (!videosGrid) return;
  
  videosGrid.innerHTML = '';
  
  videos.forEach((video, index) => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;
    const publishedAt = new Date(video.snippet.publishedAt).toLocaleDateString('fr-FR');
    const thumbnail = video.snippet.thumbnails.medium.url;
    
    const videoCard = createVideoCard(videoId, title, description, publishedAt, thumbnail, index);
    videosGrid.appendChild(videoCard);
  });
}

// Créer une carte vidéo
function createVideoCard(videoId, title, description, publishedAt, thumbnail, index) {
  const card = document.createElement('div');
  card.className = 'video-card reveal';
  card.style.transitionDelay = `${index * 0.1}s`;
  
  // Déterminer la catégorie
  const category = getVideoCategory(title);
  
  card.innerHTML = `
    <div class="video-thumb">
      <img src="${thumbnail}" alt="${title}" style="width:100%;height:100%;object-fit:cover;">
      <div class="video-play">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="white"><path d="M1 1.5L14.5 9L1 16.5V1.5Z"/></svg>
      </div>
    </div>
    <div class="video-info">
      <div class="video-meta">
        <span class="video-tag">${category}</span>
        <span class="video-date">${publishedAt}</span>
      </div>
      <div class="video-title">${title}</div>
      <div class="video-views">👁 ${Math.floor(Math.random() * 10000) + 1000} vues</div>
    </div>
  `;
  
  // Ajouter le clic pour ouvrir la vidéo
  card.addEventListener('click', () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  });
  
  return card;
}

// Déterminer la catégorie de la vidéo
function getVideoCategory(title) {
  const title_lower = title.toLowerCase();
  
  if (title_lower.includes('ia') || title_lower.includes('intelligence') || title_lower.includes('chatgpt') || title_lower.includes('gemini')) {
    return 'IA';
  } else if (title_lower.includes('review') || title_lower.includes('test') || title_lower.includes('smartphone') || title_lower.includes('pc')) {
    return 'REVIEW';
  } else if (title_lower.includes('tuto') || title_lower.includes('guide') || title_lower.includes('comment')) {
    return 'TUTO';
  } else if (title_lower.includes('linux') || title_lower.includes('windows') || title_lower.includes('logiciel')) {
    return 'LOGICIEL';
  } else {
    return 'TECH';
  }
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  loadYouTubeVideos();
});
