// YouTube integration
//
// Par défaut (aucune clé API), le site affiche un lecteur YouTube intégré (iframe) sur
// la playlist "uploads" de la chaîne — cette playlist contient automatiquement TOUTES
// les vidéos publiées, dans l'ordre, et se met à jour toute seule dès qu'une nouvelle
// vidéo est publiée. Voir index.html, section #videos (.videos-embed-wrap).
// Aucune clé, aucun proxy, aucune maintenance : c'est le lecteur officiel de YouTube.
//
// Si une clé API YouTube Data v3 est renseignée ci-dessous, le site bascule sur des
// cartes vidéo personnalisées (mêmes visuels que le reste du site) chargées via
// l'API officielle, et masque l'iframe.
const API_KEY = '';
const CHANNEL_ID = 'UCsjJdWuzdaBiHzaByKlDDag';

async function loadCustomVideoCards() {
  if (!API_KEY) return; // l'iframe (déjà dans le HTML) suffit

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=24&type=video`);
    const data = await response.json();
    if (!data.items || !data.items.length) return;

    const videosGrid = document.querySelector('.videos-grid');
    const embedWrap = document.querySelector('.videos-embed-wrap');
    if (!videosGrid) return;

    videosGrid.innerHTML = '';
    data.items.forEach((item, index) => {
      const card = createVideoCard(
        item.id.videoId,
        item.snippet.title,
        new Date(item.snippet.publishedAt).toLocaleDateString('fr-FR'),
        item.snippet.thumbnails.medium.url,
        index
      );
      videosGrid.appendChild(card);
      if (typeof observer !== 'undefined') observer.observe(card);
    });

    if (embedWrap) embedWrap.style.display = 'none';
  } catch (error) {
    console.error('Erreur API YouTube:', error);
    // En cas d'échec, l'iframe déjà présente dans la page reste affichée.
  }
}

function createVideoCard(videoId, title, publishedAt, thumbnail, index) {
  const card = document.createElement('div');
  card.className = 'video-card reveal';
  card.style.transitionDelay = `${Math.min(index, 5) * 0.1}s`;
  card.style.cursor = 'pointer';

  const category = getVideoCategory(title);
  const safeTitle = escapeHtml(title);

  card.innerHTML = `
    <div class="video-thumb">
      <img src="${thumbnail}" alt="${safeTitle}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
      <div class="video-play">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="white"><path d="M1 1.5L14.5 9L1 16.5V1.5Z"/></svg>
      </div>
    </div>
    <div class="video-info">
      <div class="video-meta">
        <span class="video-tag">${category}</span>
        <span class="video-date">${publishedAt}</span>
      </div>
      <div class="video-title">${safeTitle}</div>
    </div>
  `;

  card.addEventListener('click', () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener');
  });

  return card;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getVideoCategory(title) {
  const title_lower = title.toLowerCase();

  if (title_lower.includes('ia') || title_lower.includes('intelligence') || title_lower.includes('chatgpt') || title_lower.includes('gemini') || title_lower.includes('claude')) {
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

document.addEventListener('DOMContentLoaded', () => {
  loadCustomVideoCards();
});
