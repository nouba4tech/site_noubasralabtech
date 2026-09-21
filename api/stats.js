// Fonction serverless Vercel : va chercher le nombre d'abonnés ACTUEL de la chaîne
// YouTube côté serveur et le renvoie en JSON, pour que le compteur du site suive
// automatiquement le vrai nombre d'abonnés, sans jamais avoir besoin de modifier le code.
const CHANNEL_URL = 'https://www.youtube.com/@NLABTECHOFFICIEL';
const FALLBACK_SUBSCRIBERS = 1123; // dernier nombre connu, utilisé seulement si YouTube est injoignable

function parseSubscriberCount(text) {
  const match = text.match(/([\d.,]+)\s*([KM]?)\s*subscribers/i);
  if (!match) return null;
  const value = parseFloat(match[1].replace(',', '.'));
  const unit = match[2].toUpperCase();
  const multiplier = unit === 'M' ? 1000000 : unit === 'K' ? 1000 : 1;
  return Math.round(value * multiplier);
}

module.exports = async function handler(req, res) {
  try {
    const response = await fetch(CHANNEL_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await response.text();

    const match = html.match(/"content":"([\d.,]+\s*[KM]?\s*subscribers)"/i);
    const subscribers = match ? parseSubscriberCount(match[1]) : null;

    if (!subscribers) throw new Error('Nombre d\'abonnés introuvable dans la page de la chaîne');

    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ subscribers }));
  } catch (error) {
    console.error('Erreur récupération stats YouTube:', error);
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ subscribers: FALLBACK_SUBSCRIBERS }));
  }
};
