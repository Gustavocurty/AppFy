/**
 * Extrai nome da música (antes de " by ") e artista (depois).
 * Ex.: "Bohemian Rhapsody by Queen" → música + Queen
 */
export function parseSongTitle(rawTitle, fallbackArtist) {
  const fallback = typeof fallbackArtist === 'string' ? fallbackArtist.trim() : '';
  if (!rawTitle || typeof rawTitle !== 'string') {
    return { songTitle: '', artist: fallback };
  }

  const trimmed = rawTitle.trim();
  const parts = trimmed.split(/\s+by\s+/i);

  if (parts.length >= 2) {
    const songTitle = parts[0].trim();
    const artistFromTitle = parts.slice(1).join(' by ').trim();
    return {
      songTitle: songTitle || trimmed,
      artist: artistFromTitle || fallback,
    };
  }

  return { songTitle: trimmed, artist: fallback };
}
