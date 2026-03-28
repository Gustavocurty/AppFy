import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@appfy_history_v1';
const MAX_ENTRIES = 80;

function entryKey(entry) {
  const t = (entry.songTitle || '').trim().toLowerCase();
  const a = (entry.artist || '').trim().toLowerCase();
  return `${t}\u0000${a}`;
}

export async function loadHistory() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Grava no cache apenas música, artista e foto; mais recente no topo. */
export async function addHistoryEntry({ songTitle, artist, image }) {
  const title = (songTitle || '').trim();
  const art = (artist || '').trim();
  if (!title && !art) return loadHistory();

  const list = await loadHistory();
  const newEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    songTitle: title || 'Sem título',
    artist: art || 'Artista desconhecido',
    image: image || null,
    savedAt: Date.now(),
  };
  const k = entryKey(newEntry);
  const withoutDup = list.filter((e) => entryKey(e) !== k);
  const next = [newEntry, ...withoutDup].slice(0, MAX_ENTRIES);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
