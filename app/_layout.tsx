import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { BodyDataProvider } from '../contexts/BodyDataContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import OnboardingScreen from '../screens/OnboardingScreen';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('bodyweather_onboarded').then(val => {
      setOnboarded(val === 'true');
    });
  }, []);

  if (onboarded === null) return null;

  return (
    <LanguageProvider>
      <BodyDataProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
        {!onboarded && (
          <OnboardingScreen onDone={() => setOnboarded(true)} />
        )}
      </BodyDataProvider>
    </LanguageProvider>
  );
}