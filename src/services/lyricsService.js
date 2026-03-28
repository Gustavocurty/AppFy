import axios from 'axios';
import { Platform } from 'react-native';
import { parseSongTitle } from '../utils/parseSongTitle';

const API_URL = 'https://lyric.mackle.im/api';
const WEB_PROXY = 'https://api.allorigins.win/raw?url=';

export async function fetchLyricsByArtist(artist) {
  const trimmedArtist = artist.trim();
  if (!trimmedArtist) {
    throw new Error('Informe um artista válido.');
  }

  const requestUrl = Platform.OS === 'web'
    ? `${WEB_PROXY}${encodeURIComponent(`${API_URL}?artist=${trimmedArtist}`)}`
    : API_URL;

  const response = await axios.get(requestUrl, Platform.OS === 'web' ? {
    timeout: 10000,
  } : {
    params: {
      artist: trimmedArtist,
    },
    timeout: 10000,
  });

  const info = response.data?.info;
  if (!info || typeof info !== 'object') {
    throw new Error('Não encontramos letras para este artista.');
  }

  const apiArtist = typeof info.artist === 'string' ? info.artist.trim() : '';
  const rawTitle = typeof info.title === 'string' ? info.title : '';
  const { songTitle, artist: parsedArtist } = parseSongTitle(
    rawTitle,
    apiArtist || trimmedArtist,
  );

  return {
    title: songTitle || rawTitle || trimmedArtist,
    artist: parsedArtist || apiArtist || trimmedArtist,
    lyrics: typeof info.lyrics === 'string' && info.lyrics.length > 0
      ? info.lyrics
      : 'Letra não disponível no momento.',
    image: info.image || null,
  };
}
