// Fonction serverless Vercel : va chercher la photo de profil ACTUELLE de la chaîne
// YouTube côté serveur (pas de blocage CORS possible ici) et redirige dessus.
// Résultat : la photo affichée sur le site suit automatiquement celle de la chaîne,
// sans jamais avoir besoin de modifier le code.
const CHANNEL_URL = 'https://www.youtube.com/@NLABTECHOFFICIEL';
const FALLBACK_IMAGE = '/images/image.jpeg';

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(CHANNEL_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await response.text();

    const match =
      html.match(/"avatar":\{"thumbnails":\[\{"url":"([^"]+)"/) ||
      html.match(/<meta property="og:image" content="([^"]+)"/);

    if (!match) throw new Error('Avatar introuvable dans la page de la chaîne');

    // Vidéos/avatars mis en cache 1h côté CDN pour éviter de solliciter YouTube
    // à chaque visite, tout en restant à jour en quasi temps réel.
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    res.writeHead(302, { Location: match[1] });
    res.end();
  } catch (error) {
    console.error('Erreur récupération avatar YouTube:', error);
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.writeHead(302, { Location: FALLBACK_IMAGE });
    res.end();
  }
};
