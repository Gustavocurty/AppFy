import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  moderateScale,
  responsiveFont,
  horizontalScale,
} from '../utils/responsive';
import ArtistSearch from '../components/ArtistSearch';
import ResultCard from '../components/ResultCard';
import EmptyState from '../components/EmptyState';
import ErrorBanner from '../components/ErrorBanner';
import { fetchLyricsByArtist } from '../services/lyricsService';
import { addHistoryEntry } from '../services/historyCache';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [query, setQuery] = useState('');
  const [lyricsData, setLyricsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const prefill = route.params?.prefillArtist;
    const token = route.params?.prefillAt;
    if (
      typeof prefill === 'string' &&
      prefill.trim() &&
      token != null
    ) {
      setQuery(prefill.trim());
      navigation.setParams({
        prefillArtist: undefined,
        prefillAt: undefined,
      });
    }
  }, [route.params?.prefillArtist, route.params?.prefillAt, navigation]);

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [headerAnim]);

  useEffect(() => {
    if (!loading) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [loading, pulseAnim]);

  async function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Digite o nome de um artista.');
      return;
    }

    setError('');
    setLoading(true);
    setLyricsData(null);

    try {
      const data = await fetchLyricsByArtist(trimmed);
      setLyricsData(data);
      await addHistoryEntry({
        songTitle: data.title,
        artist: data.artist,
        image: data.image,
      });
    } catch (err) {
      setError(err.message || 'Erro ao buscar letras.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-24, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.logoText}>
            app<Text style={styles.logoDot}>.</Text>fy
          </Text>
          <Text style={styles.tagline}>Descubra letras ao acaso</Text>
        </Animated.View>

        <ArtistSearch
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          focused={focused}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={loading}
        />

        <ErrorBanner message={error} />

        {loading && (
          <Animated.View
            style={[styles.loadingBox, { transform: [{ scale: pulseAnim }] }]}
          >
            <ActivityIndicator color="#C8FF00" size="large" />
          </Animated.View>
        )}

        {!loading && lyricsData && <ResultCard data={lyricsData} />}
        {!loading && !lyricsData && !error && <EmptyState />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  bgOrb1: {
    position: 'absolute',
    width: horizontalScale(320),
    height: horizontalScale(320),
    borderRadius: horizontalScale(160),
    backgroundColor: '#C8FF0012',
    top: moderateScale(-90),
    right: moderateScale(-90),
  },
  bgOrb2: {
    position: 'absolute',
    width: horizontalScale(240),
    height: horizontalScale(240),
    borderRadius: horizontalScale(120),
    backgroundColor: '#00BFFF08',
    bottom: moderateScale(100),
    left: moderateScale(-70),
  },
  scroll: {
    paddingHorizontal: moderateScale(22),
    paddingTop: Platform.OS === 'ios' ? moderateScale(12) : moderateScale(8),
    paddingBottom: moderateScale(24),
  },
  header: {
    marginBottom: moderateScale(28),
  },
  logoText: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: responsiveFont(44),
    fontWeight: '700',
    color: '#F0F0F0',
    letterSpacing: -1,
  },
  logoDot: {
    color: '#C8FF00',
  },
  tagline: {
    fontSize: responsiveFont(13),
    color: '#7C7C7C',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: moderateScale(6),
  },
  loadingBox: {
    alignItems: 'center',
    marginVertical: moderateScale(32),
  },
});
