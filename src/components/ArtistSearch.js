import React from 'react';
import { useWindowDimensions, View, TextInput, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { moderateScale, responsiveFont } from '../utils/responsive';

export default function ArtistSearch({
  value,
  onChange,
  onSubmit,
  focused,
  onFocus,
  onBlur,
  disabled,
}) {
  const { width } = useWindowDimensions();
  const narrowMode = width < 380;

  return (
    <View style={[styles.container, focused && styles.focusedContainer, narrowMode && styles.containerNarrow]}>
      <TextInput
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmit}
        placeholder="Digite o nome do artista"
        placeholderTextColor="#838383"
        returnKeyType="search"
        editable={!disabled}
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onSubmit}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{disabled ? 'Buscando...' : 'Buscar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#292929',
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 10,
    marginBottom: 20,
  },
  focusedContainer: {
    borderColor: '#C8FF00',
  },
  input: {
    flex: 1,
    color: '#F4F4F4',
    fontSize: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  button: {
    backgroundColor: '#C8FF00',
    borderRadius: 14,
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(18),
    minWidth: 90,
  },
  containerNarrow: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonDisabled: {
    backgroundColor: '#8EA855',
  },
  buttonText: {
    color: '#0A0A0A',
    fontSize: 15,
    fontWeight: '700',
  },
};
