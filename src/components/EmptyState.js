import React from 'react';
import { useWindowDimensions, View, Text, StyleSheet } from 'react-native';
import { moderateScale, responsiveFont } from '../utils/responsive';

export default function EmptyState() {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { paddingHorizontal: width * 0.06 }]}> 
      <Text style={styles.emoji}>🎧</Text>
      <Text style={styles.title}>Nenhuma letra carregada ainda</Text>
      <Text style={styles.subtitle}>Pesquise um artista para ver uma letra aleatória aparecer aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: moderateScale(40),
    marginBottom: moderateScale(28),
  },
  emoji: {
    fontSize: responsiveFont(38),
    marginBottom: moderateScale(16),
  },
  title: {
    color: '#F4F4F4',
    fontSize: responsiveFont(17),
    fontWeight: '700',
    marginBottom: moderateScale(8),
  },
  subtitle: {
    color: '#8A8A8A',
    fontSize: responsiveFont(14),
    textAlign: 'center',
    lineHeight: moderateScale(22),
    maxWidth: '85%',
  },
});
