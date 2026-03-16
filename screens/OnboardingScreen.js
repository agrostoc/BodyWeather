import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    Dimensions, Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ onDone }) {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);

  const SLIDES = [
    { emoji: '🌤', title: t.welcomeTitle, subtitle: t.welcomeBody, color: '#6C63FF' },
    { emoji: '📊', title: t.trackTitle, subtitle: t.trackBody, color: '#00C896' },
    { emoji: '📈', title: t.trendTitle, subtitle: t.trendBody, color: '#FFC107' },
  ];

  const handleNext = async () => {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1);
    } else {
      await AsyncStorage.setItem('bodyweather_onboarded', 'true');
      onDone();
    }
  };

  const slide = SLIDES[current];

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Text style={styles.emoji}>{slide.emoji}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === current && { backgroundColor: slide.color, width: 24 }]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: slide.color }]}
        onPress={handleNext}
        activeOpacity={0.85}
      >
        <Text style={styles.btnText}>
          {current < SLIDES.length - 1 ? t.continue : t.start}
        </Text>
      </TouchableOpacity>

      {current < SLIDES.length - 1 && (
        <TouchableOpacity onPress={handleNext} style={styles.skip}>
          <Text style={styles.skipText}>{t.skip}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#12121f',
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  slide: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  emoji:    { fontSize: 80, marginBottom: 32 },
  title:    { fontSize: 28, fontWeight: '800', color: '#e0e0f0', textAlign: 'center', marginBottom: 16 },
  subtitle: { fontSize: 17, color: '#888', textAlign: 'center', lineHeight: 26 },
  dots: { flexDirection: 'row', marginBottom: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2a2a3e', marginHorizontal: 4 },
  btn: { width: width - 64, padding: 18, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  skip: { marginBottom: 32 },
  skipText: { color: '#555', fontSize: 14 },
});