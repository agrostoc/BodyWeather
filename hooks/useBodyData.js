import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { calculateScore } from '../utils/scoreEngine';

const STORAGE_KEY = 'bodyweather_log';

const DEFAULT_TODAY = {
  sleepHours:   7,
  sleepQuality: 3,
  energy:       5,
  hydration:    2,
  stress:       5,
};

export function useBodyData() {
  const [todayInputs, setTodayInputs] = useState(DEFAULT_TODAY);
  const [history, setHistory]         = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setHistory(parsed);
          const todayKey = todayDateKey();
          const todayEntry = parsed.find(e => e.date === todayKey);
          if (todayEntry) setTodayInputs({ ...DEFAULT_TODAY, ...todayEntry.inputs });
        }
      } catch (e) {
        console.warn('BodyWeather: eroare citire storage', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveToday = useCallback(async (inputs, note = '') => {
    const dateKey = todayDateKey();
    const streak  = computeStreak(history, dateKey);
    const score   = calculateScore({ ...inputs, streakDays: streak });
    const entry   = { date: dateKey, inputs, score, note: note || '' };

    const updated = [
      ...history.filter(e => e.date !== dateKey),
      entry,
    ].sort((a, b) => a.date.localeCompare(b.date));

    setHistory(updated);
    setTodayInputs(inputs);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('BodyWeather: eroare scriere storage', e);
    }

    return score;
  }, [history]);

  const seedTestData = useCallback(async () => {
    const days = 14;
    const seeded = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const inputs = {
        sleepHours:   parseFloat((5 + Math.random() * 4).toFixed(1)),
        sleepQuality: 1 + Math.floor(Math.random() * 5),
        energy:       3 + Math.floor(Math.random() * 8),
        hydration:    parseFloat((1 + Math.random() * 2.5).toFixed(1)),
        stress:       1 + Math.floor(Math.random() * 10),
      };
      const score = calculateScore({ ...inputs, streakDays: days - i });
      const notes = ['', '', '', 'feeling good', 'long day', 'quiet morning', '', 'workout done'];
      seeded.push({ date: dateKey, inputs, score, note: notes[Math.floor(Math.random() * notes.length)] });
    }
    setHistory(seeded);
    const todayEntry = seeded[seeded.length - 1];
    if (todayEntry) setTodayInputs({ ...DEFAULT_TODAY, ...todayEntry.inputs });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    } catch (e) {
      console.warn('BodyWeather: eroare seed', e);
    }
  }, []);

  const liveScore = calculateScore({
    ...todayInputs,
    streakDays: computeStreak(history, todayDateKey()),
  });

  const streak = computeStreak(history, todayDateKey());

  return {
    todayInputs,
    setTodayInputs,
    liveScore,
    saveToday,
    seedTestData,
    history,
    loading,
    streak,
  };
}

function todayDateKey() {
  return new Date().toISOString().split('T')[0];
}

function computeStreak(history, todayKey) {
  if (!history.length) return 1;
  let streak = 1;
  let current = new Date(todayKey);
  while (true) {
    current.setDate(current.getDate() - 1);
    const key = current.toISOString().split('T')[0];
    if (history.find(e => e.date === key)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}