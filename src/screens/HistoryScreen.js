import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useFocusEffect } from '@react-navigation/native';
import { moderateScale, responsiveFont } from '../utils/responsive';
import { loadHistory, removeHistoryEntryById } from '../services/historyCache';

export default function HistoryScreen() {
  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadHistory().then((list) => {
        if (active) setItems(list);
      });
      return () => {
        active = false;
      };
    }, []),
  );

  async function handleCopy(item) {
    const text = `${item.songTitle}\n${item.artist}`;
    await Clipboard.setStringAsync(text);
  }

  function handlePressItem(item) {
    Alert.alert(
      item.songTitle,
      item.artist,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Copiar',
          onPress: () => {
            handleCopy(item);
          },
        },
        {
          text: 'Excluir do histórico',
          style: 'destructive',
          onPress: async () => {
            const next = await removeHistoryEntryById(item.id);
            setItems(next);
          },
        },
      ],
      { cancelable: true },
    );
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={[styles.row, Platform.OS === 'web' && styles.rowWeb]}
        onPress={() => handlePressItem(item)}
        activeOpacity={0.75}
      >
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.thumb} />
        ) : (
          <View style={styles.thumbPlaceholder} />
        )}
        <View style={styles.textCol}>
          <Text style={styles.songTitle} numberOfLines={2}>
            {item.songTitle}
          </Text>
          <Text style={styles.artistName} numberOfLines={2}>
            {item.artist}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <View style={styles.bgOrb} />
        <Text style={styles.screenTitle}>Histórico</Text>
        <Text style={styles.subtitle}>Suas buscas recentes</Text>

        {items.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>
              Nenhuma música salva ainda. Busque um artista na aba Buscar.
            </Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(it) => it.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  root: {
    flex: 1,
    paddingHorizontal: moderateScale(22),
    paddingTop: moderateScale(8),
  },
  bgOrb: {
    position: 'absolute',
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(100),
    backgroundColor: '#00BFFF06',
    top: moderateScale(40),
    right: moderateScale(-60),
  },
  screenTitle: {
    color: '#F0F0F0',
    fontSize: responsiveFont(28),
    fontWeight: '700',
    marginBottom: moderateScale(4),
  },
  subtitle: {
    color: '#6A6A6A',
    fontSize: responsiveFont(13),
    marginBottom: moderateScale(20),
  },
  listContent: {
    paddingBottom: moderateScale(24),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#252525',
    padding: moderateScale(12),
    marginBottom: moderateScale(12),
  },
  rowWeb: {
    boxShadow: '0px 8px 20px rgba(0,0,0,0.25)',
  },
  thumb: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(12),
    backgroundColor: '#1B1B1B',
  },
  thumbPlaceholder: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(12),
    backgroundColor: '#1B1B1B',
  },
  textCol: {
    flex: 1,
    marginLeft: moderateScale(14),
    justifyContent: 'center',
  },
  songTitle: {
    color: '#F5F5F5',
    fontSize: responsiveFont(16),
    fontWeight: '700',
    marginBottom: moderateScale(4),
  },
  artistName: {
    color: '#9A9A9A',
    fontSize: responsiveFont(13),
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: moderateScale(40),
  },
  emptyText: {
    color: '#7C7C7C',
    fontSize: responsiveFont(15),
    lineHeight: moderateScale(22),
    textAlign: 'center',
  },
});
