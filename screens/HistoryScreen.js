import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBodyDataContext } from '../contexts/BodyDataContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function HistoryScreen() {
  const { history } = useBodyDataContext();
  const { t, lang } = useLanguage();
  const last7 = getLast7Days(history, lang);
  const maxScore = 100;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t.evolution}</Text>
      <View style={styles.chartCard}>
        <View style={styles.chart}>
          {last7.map((day, i) => {
            const height = day.score ? (day.score / maxScore) * 140 : 4;
            const color = getColor(day.score);
            return (
              <View key={i} style={styles.barWrapper}>
                <Text style={styles.barScore}>{day.score > 0 ? day.score : ''}</Text>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height, backgroundColor: color }]} />
                </View>
                <Text style={styles.barDay}>{day.dayLabel}</Text>
                <Text style={styles.barEmoji}>{day.score > 0 ? getEmoji(day.score) : '·'}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.statsRow}>
        <StatCard label={t.average} value={getAverage(last7)} emoji="📊" />
        <StatCard label={t.maximum} value={getMax(last7)} emoji="🏆" />
        <StatCard label={t.daysLogged} value={getDaysLogged(last7)} emoji="🔥" />
      </View>
      <Text style={styles.sectionTitle}>{t.detailedHistory}</Text>
      {last7.filter(d => d.score > 0).reverse().map((day, i) => (
        <View key={i} style={styles.historyRow}>
          <Text style={styles.historyEmoji}>{getEmoji(day.score)}</Text>
          <View style={styles.historyInfo}>
            <Text style={styles.historyDate}>{day.fullLabel}</Text>
            <Text style={styles.historyDetails}>
              😴 {day.sleepHours}h  ✨ {day.sleepQuality}/5  ⚡ {day.energy}/10
            </Text>
            <Text style={styles.historyDetails}>
              💧 {day.hydration}L  🧠 {t.stress ? t.stress.toLowerCase() : 'stress'} {day.stress}/10
            </Text>
          </View>
          <Text style={[styles.historyScore, { color: getColor(day.score) }]}>
            {day.score}
          </Text>
        </View>
      ))}
      {last7.filter(d => d.score > 0).length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>{t.noEntries}</Text>
        </View>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function StatCard({ label, value, emoji }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function getLocale(lang) {
  if (lang === 'ro') return 'ro-RO';
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'de') return 'de-DE';
  if (lang === 'es') return 'es-ES';
  if (lang === 'it') return 'it-IT';
  if (lang === 'pt') return 'pt-PT';
  if (lang === 'zh') return 'zh-CN';
  return 'en-US';
}

function getTodayLabel(lang) {
  const labels = { ro: 'Azi', en: 'Today', fr: "Auj.", de: 'Heute', es: 'Hoy', it: 'Oggi', pt: 'Hoje', zh: '今天' };
  return labels[lang] || 'Today';
}

function getShortDayNames(lang) {
  const names = {
    ro: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'],
    en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    es: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    it: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
    pt: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
    zh: ['日', '一', '二', '三', '四', '五', '六'],
  };
  return names[lang] || names['en'];
}

function getLast7Days(history, lang) {
  const days = [];
  const dayNames = getShortDayNames(lang);
  const todayLabel = getTodayLabel(lang);
  const locale = getLocale(lang);

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const entry = history.find(e => e.date === key);
    days.push({
      date: key,
      dayLabel: i === 0 ? todayLabel : dayNames[d.getDay()],
      fullLabel: d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' }),
      score:        entry ? entry.score.total : 0,
      sleepHours:   entry ? entry.inputs.sleepHours : '-',
      sleepQuality: entry ? entry.inputs.sleepQuality : '-',
      energy:       entry ? entry.inputs.energy : '-',
      hydration:    entry ? (entry.inputs.hydration || '-') : '-',
      stress:       entry ? (entry.inputs.stress || '-') : '-',
    });
  }
  return days;
}

function getColor(score) {
  if (!score) return '#2a2a3e';
  if (score >= 85) return '#00C896';
  if (score >= 70) return '#4CAF50';
  if (score >= 55) return '#FFC107';
  if (score >= 40) return '#FF9800';
  return '#F44336';
}

function getEmoji(score) {
  if (score >= 85) return '⚡';
  if (score >= 70) return '🌤';
  if (score >= 55) return '🌥';
  if (score >= 40) return '🌧';
  return '⛈';
}

function getAverage(days) {
  const logged = days.filter(d => d.score > 0);
  if (!logged.length) return '-';
  return Math.round(logged.reduce((s, d) => s + d.score, 0) / logged.length);
}

function getMax(days) {
  const logged = days.filter(d => d.score > 0);
  if (!logged.length) return '-';
  return Math.max(...logged.map(d => d.score));
}

function getDaysLogged(days) {
  return days.filter(d => d.score > 0).length + '/7';
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12121f' },
  content: { padding: 20, paddingTop: Platform.OS === 'ios' ? 60 : 30 },
  title: { fontSize: 22, fontWeight: '700', color: '#e0e0f0', marginBottom: 20 },
  chartCard: { backgroundColor: '#1a1a2e', borderRadius: 16, padding: 20, marginBottom: 16 },
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 180 },
  barWrapper: { alignItems: 'center', flex: 1 },
  barScore: { fontSize: 10, color: '#888', marginBottom: 4, fontWeight: '600' },
  barBackground: { width: 28, height: 140, backgroundColor: '#0f0f1e', borderRadius: 6, justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', borderRadius: 6 },
  barDay: { fontSize: 11, color: '#666', marginTop: 6 },
  barEmoji: { fontSize: 14, marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#1a1a2e', borderRadius: 14, padding: 14, alignItems: 'center', marginHorizontal: 4 },
  statEmoji: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '800', color: '#e0e0f0' },
  statLabel: { fontSize: 11, color: '#666', marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  historyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a2e', borderRadius: 14, padding: 14, marginBottom: 10 },
  historyEmoji: { fontSize: 28, marginRight: 12 },
  historyInfo: { flex: 1 },
  historyDate: { fontSize: 14, fontWeight: '600', color: '#e0e0f0', textTransform: 'capitalize' },
  historyDetails: { fontSize: 12, color: '#666', marginTop: 3 },
  historyScore: { fontSize: 28, fontWeight: '800' },
  emptyCard: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 30, alignItems: 'center' },
  emptyText: { color: '#666', textAlign: 'center', lineHeight: 24, fontSize: 14 },
});