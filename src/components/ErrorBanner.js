import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, responsiveFont } from '../utils/responsive';

export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#430000',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    marginBottom: moderateScale(18),
    borderWidth: 1,
    borderColor: '#8A0000',
  },
  text: {
    color: '#FCE8E8',
    fontSize: responsiveFont(14),
    lineHeight: moderateScale(20),
  },
});
