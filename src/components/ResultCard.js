import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { moderateScale, responsiveFont } from '../utils/responsive';

export default function ResultCard({ data }) {
  const title = data.title || 'Música desconhecida';
  const artist = data.artist || 'Artista desconhecido';
  const lyrics = data.lyrics || 'Letra indisponível';
  const imageUrl = data.image;

  return (
    <View style={[styles.card, Platform.OS === 'web' && styles.cardWebShadow]}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.cover} resizeMode="cover" />
      ) : (
        <View style={styles.placeholderCover} />
      )}

      <View style={styles.infoBox}>
        <Text style={styles.songTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.artistName}>{artist}</Text>
      </View>

      <View style={styles.lyricsBox}>
        <Text style={styles.lyricsTitle}>Letra</Text>
        <Text style={styles.lyricsText}>{lyrics}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(28),
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#252525',
    overflow: 'hidden',
    marginBottom: moderateScale(32),
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: moderateScale(18),
    elevation: 8,
  },
  cover: {
    width: '100%',
    height: moderateScale(200),
  },
  placeholderCover: {
    width: '100%',
    height: moderateScale(200),
    backgroundColor: '#1B1B1B',
  },
  cardWebShadow: {
    boxShadow: '0px 20px 35px rgba(0,0,0,0.18)',
  },
  infoBox: {
    paddingVertical: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  songTitle: {
    color: '#F7F7F7',
    fontSize: responsiveFont(22),
    fontWeight: '800',
    marginBottom: moderateScale(6),
  },
  artistName: {
    color: '#A7A7A7',
    fontSize: responsiveFont(13),
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  lyricsBox: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(18),
  },
  lyricsTitle: {
    color: '#C8FF00',
    fontSize: responsiveFont(12),
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  lyricsText: {
    color: '#E8E8E8',
    fontSize: responsiveFont(15),
    lineHeight: moderateScale(24),
    letterSpacing: 0.3,
  },
});
