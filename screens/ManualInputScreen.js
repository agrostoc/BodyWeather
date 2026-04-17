import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useBodyDataContext as useBodyData } from '../contexts/BodyDataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { cancelReminders, scheduleDailyReminder } from '../utils/notifications';

export default function ManualInputScreen() {
  const { todayInputs, setTodayInputs, liveScore, saveToday, history } = useBodyData();
  const { t, lang } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [reminderOn, setReminderOn] = useState(false);
  const [note, setNote] = useState('');

  // Preload today's existing note from history (if any)
  useEffect(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    const entry = history.find(e => e.date === todayKey);
    if (entry && typeof entry.note === 'string') {
      setNote(entry.note);
    }
  }, [history]);

  const QUALITY_OPTIONS = [
    { value: 1, emoji: '😴', label: t.terrible },
    { value: 2, emoji: '😕', label: t.bad },
    { value: 3, emoji: '😐', label: t.ok },
    { value: 4, emoji: '😊', label: t.good2 },
    { value: 5, emoji: '🤩', label: t.perfect },
  ];

  const STRESS_OPTIONS = [
    { value: 1,  emoji: '😌', label: t.zero },
    { value: 3,  emoji: '🙂', label: t.small },
    { value: 5,  emoji: '😐', label: t.medium },
    { value: 7,  emoji: '😟', label: t.high },
    { value: 10, emoji: '🤯', label: t.max },
  ];

  const getLocale = () => {
    if (lang === 'ro') return 'ro-RO';
    if (lang === 'fr') return 'fr-FR';
    if (lang === 'de') return 'de-DE';
    if (lang === 'es') return 'es-ES';
    if (lang === 'it') return 'it-IT';
    if (lang === 'pt') return 'pt-PT';
    if (lang === 'zh') return 'zh-CN';
    return 'en-US';
  };

  const update = (field, value) => {
    setTodayInputs(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    await saveToday(todayInputs, note);
    setSaved(true);
  };

  const handleReminder = async (value) => {
    setReminderOn(value);
    if (value) {
     const ok = await scheduleDailyReminder(lang);
      if (!ok) setReminderOn(false);
    } else {
      await cancelReminders();
    }
  };

  const scoreColor = liveScore.color || '#888';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={[styles.scoreCard, { borderColor: scoreColor }]}>
        <Text style={styles.scoreEmoji}>{liveScore.emoji}</Text>
        <Text style={[styles.scoreNumber, { color: scoreColor }]}>{liveScore.total}</Text>
        <Text style={[styles.scoreLabel, { color: scoreColor }]}>{t[liveScore.labelKey] || liveScore.labelKey}</Text>
        <Text style={styles.scoreDate}>
          {new Date().toLocaleDateString(getLocale(), { weekday: 'long', day: 'numeric', month: 'long' })}
        </Text>
      </View>

      {/* ── Somn ore ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>🌙</Text>
          <Text style={styles.cardTitle}>{t.sleepHours}</Text>
          <Text style={styles.cardValue}>{todayInputs.sleepHours}h</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0} maximumValue={12} step={0.5}
          value={todayInputs.sleepHours}
          onValueChange={v => update('sleepHours', v)}
          minimumTrackTintColor="#6C63FF"
          maximumTrackTintColor="#2a2a3e"
          thumbTintColor="#6C63FF"
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>0h</Text>
          <Text style={styles.sliderLabelText}>6h</Text>
          <Text style={styles.sliderLabelText}>12h</Text>
        </View>
        <SleepContext hours={todayInputs.sleepHours} t={t} />
      </View>

      {/* ── Calitate somn ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>✨</Text>
          <Text style={styles.cardTitle}>{t.sleepQuality}</Text>
        </View>
        <View style={styles.qualityRow}>
          {QUALITY_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.qualityBtn, todayInputs.sleepQuality === opt.value && styles.qualityBtnActive]}
              onPress={() => update('sleepQuality', opt.value)}
            >
              <Text style={styles.qualityEmoji}>{opt.emoji}</Text>
              <Text style={[styles.qualityLabel, todayInputs.sleepQuality === opt.value && styles.qualityLabelActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Energie ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>⚡</Text>
          <Text style={styles.cardTitle}>{t.energyLevel}</Text>
          <Text style={styles.cardValue}>{todayInputs.energy}/10</Text>
        </View>
        <EnergySelector value={todayInputs.energy} onChange={v => update('energy', v)} />
      </View>

      {/* ── Hidratare ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>💧</Text>
          <Text style={styles.cardTitle}>{t.hydration}</Text>
          <Text style={styles.cardValue}>{todayInputs.hydration}L</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0} maximumValue={4} step={0.25}
          value={todayInputs.hydration}
          onValueChange={v => update('hydration', v)}
          minimumTrackTintColor="#00B4D8"
          maximumTrackTintColor="#2a2a3e"
          thumbTintColor="#00B4D8"
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>0L</Text>
          <Text style={styles.sliderLabelText}>2L</Text>
          <Text style={styles.sliderLabelText}>4L</Text>
        </View>
        <HydrationContext liters={todayInputs.hydration} t={t} />
      </View>

      {/* ── Stres ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>🧠</Text>
          <Text style={styles.cardTitle}>{t.stress}</Text>
        </View>
        <View style={styles.qualityRow}>
          {STRESS_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.qualityBtn, todayInputs.stress === opt.value && styles.stressBtnActive]}
              onPress={() => update('stress', opt.value)}
            >
              <Text style={styles.qualityEmoji}>{opt.emoji}</Text>
              <Text style={[styles.qualityLabel, todayInputs.stress === opt.value && styles.qualityLabelActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Notebook (optional) ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>📓</Text>
          <Text style={styles.cardTitle}>{t.notebookTitle}</Text>
        </View>
        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={(txt) => { setNote(txt); setSaved(false); }}
          placeholder={t.notebookPlaceholder}
          placeholderTextColor="#555"
          multiline
          maxLength={280}
          textAlignVertical="top"
        />
        <Text style={styles.noteHint}>{t.notebookHint}</Text>
      </View>

      {/* ── Breakdown ── */}
      <View style={styles.card}>
        <Text style={styles.breakdownTitle}>Breakdown</Text>
        {Object.entries({
          [t.sleepHours]:   liveScore.breakdown && liveScore.breakdown.sleepHours,
          [t.sleepQuality]: liveScore.breakdown && liveScore.breakdown.sleepQuality,
          [t.energy]:       liveScore.breakdown && liveScore.breakdown.energy,
          [t.hydration]:    liveScore.breakdown && liveScore.breakdown.hydration,
          [t.stress]:       liveScore.breakdown && liveScore.breakdown.stress,
        }).map(([label, val]) => (
          <BreakdownRow key={label} label={label} value={val} />
        ))}
      </View>

      {/* ── Reminder ── */}
      <View style={styles.reminderCard}>
        <View style={styles.reminderLeft}>
          <Text style={styles.reminderIcon}>🔔</Text>
          <View>
            <Text style={styles.reminderTitle}>{t.dailyReminder}</Text>
            <Text style={styles.reminderSub}>{t.reminderSub}</Text>
          </View>
        </View>
        <Switch
          value={reminderOn}
          onValueChange={handleReminder}
          trackColor={{ false: '#2a2a3e', true: '#6C63FF' }}
          thumbColor={reminderOn ? '#fff' : '#666'}
        />
      </View>

      {/* ── Save ── */}
      <TouchableOpacity
        style={[styles.saveBtn, saved && styles.saveBtnDone]}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <Text style={styles.saveBtnText}>
          {saved ? t.savedDay : t.saveDay}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ── Componente helper ────────────────────────────────────────────────────────

function SleepContext({ hours, t }) {
  let msg = '';
  if (hours < 5)       msg = t.sleepTooLow;
  else if (hours < 7)  msg = t.sleepLow;
  else if (hours <= 9) msg = t.optimalRange;
  else                 msg = t.sleepTooHigh;
  return <Text style={styles.contextMsg}>{msg}</Text>;
}

function HydrationContext({ liters, t }) {
  let msg = '';
  if (liters <= 0)      msg = t.hydrationZero;
  else if (liters < 1)  msg = t.hydrationLow;
  else if (liters < 2)  msg = t.hydrationMedium;
  else if (liters <= 3) msg = t.hydrationGood;
  else                  msg = t.hydrationGreat;
  return <Text style={styles.contextMsg}>{msg}</Text>;
}

function EnergySelector({ value, onChange }) {
  return (
    <View style={styles.energyGrid}>
      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
        <TouchableOpacity
          key={n}
          style={[
            styles.energyBtn,
            n <= value && styles.energyBtnActive,
            n === value && styles.energyBtnCurrent,
          ]}
          onPress={() => onChange(n)}
        >
          <Text style={[styles.energyBtnText, n <= value && styles.energyBtnTextActive]}>{n}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function BreakdownRow({ label, value }) {
  const w = Math.max(0, Math.min(100, value || 0));
  const color = w >= 70 ? '#00C896' : w >= 45 ? '#FFC107' : '#F44336';
  return (
    <View style={styles.breakdownRow}>
      <Text style={styles.breakdownLabel}>{label}</Text>
      <View style={styles.breakdownBar}>
        <View style={[styles.breakdownFill, { width: `${w}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.breakdownVal, { color }]}>{w}</Text>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12121f' },
  content:   { padding: 20, paddingTop: Platform.OS === 'ios' ? 60 : 30 },

  scoreCard:   { alignItems: 'center', borderRadius: 20, borderWidth: 2, padding: 24, marginBottom: 20, backgroundColor: '#1a1a2e' },
  scoreEmoji:  { fontSize: 48, marginBottom: 8 },
  scoreNumber: { fontSize: 64, fontWeight: '800', lineHeight: 70 },
  scoreLabel:  { fontSize: 20, fontWeight: '600', marginTop: 4 },
  scoreDate:   { fontSize: 13, color: '#666', marginTop: 8, textTransform: 'capitalize' },

  card:       { backgroundColor: '#1a1a2e', borderRadius: 16, padding: 18, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  cardIcon:   { fontSize: 20, marginRight: 8 },
  cardTitle:  { flex: 1, fontSize: 16, fontWeight: '600', color: '#e0e0f0' },
  cardValue:  { fontSize: 16, fontWeight: '700', color: '#6C63FF' },

  slider:          { width: '100%', height: 40 },
  sliderLabels:    { flexDirection: 'row', justifyContent: 'space-between', marginTop: -6 },
  sliderLabelText: { fontSize: 11, color: '#555' },
  contextMsg:      { fontSize: 12, color: '#888', marginTop: 8, textAlign: 'center' },
  noteInput:       { minHeight: 72, backgroundColor: '#0f0f1e', borderRadius: 12, padding: 12, color: '#e0e0f0', fontSize: 14, lineHeight: 20, fontStyle: 'italic' },
  noteHint:        { fontSize: 11, color: '#555', marginTop: 6, textAlign: 'right' },

  qualityRow:        { flexDirection: 'row', justifyContent: 'space-between' },
  qualityBtn:        { alignItems: 'center', padding: 10, borderRadius: 12, flex: 1, marginHorizontal: 3, backgroundColor: '#0f0f1e' },
  qualityBtnActive:  { backgroundColor: '#2d1f7a' },
  stressBtnActive:   { backgroundColor: '#3d1010' },
  qualityEmoji:      { fontSize: 22 },
  qualityLabel:      { fontSize: 10, color: '#555', marginTop: 4 },
  qualityLabelActive:{ color: '#a89cf5' },

  energyGrid:          { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 },
  energyBtn:           { width: '18%', aspectRatio: 1, borderRadius: 10, backgroundColor: '#0f0f1e', alignItems: 'center', justifyContent: 'center' },
  energyBtnActive:     { backgroundColor: '#1e1055' },
  energyBtnCurrent:    { backgroundColor: '#6C63FF' },
  energyBtnText:       { fontSize: 15, color: '#444', fontWeight: '600' },
  energyBtnTextActive: { color: '#a89cf5' },

  breakdownTitle: { fontSize: 14, fontWeight: '600', color: '#888', marginBottom: 12 },
  breakdownRow:   { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  breakdownLabel: { width: 110, fontSize: 13, color: '#aaa' },
  breakdownBar:   { flex: 1, height: 6, backgroundColor: '#0f0f1e', borderRadius: 3, overflow: 'hidden', marginHorizontal: 10 },
  breakdownFill:  { height: '100%', borderRadius: 3 },
  breakdownVal:   { width: 30, fontSize: 12, fontWeight: '700', textAlign: 'right' },

  reminderCard:  { backgroundColor: '#1a1a2e', borderRadius: 16, padding: 18, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reminderLeft:  { flexDirection: 'row', alignItems: 'center' },
  reminderIcon:  { fontSize: 24, marginRight: 12 },
  reminderTitle: { fontSize: 15, fontWeight: '600', color: '#e0e0f0' },
  reminderSub:   { fontSize: 12, color: '#666', marginTop: 2 },

  saveBtn:     { backgroundColor: '#6C63FF', borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 8 },
  saveBtnDone: { backgroundColor: '#00C896' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});