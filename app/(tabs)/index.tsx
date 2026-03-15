import { ScrollView, StyleSheet, Text, View } from 'react-native';

const getWeatherEmoji = (score: number) => {
  if (score >= 80) return '☀️';
  if (score >= 60) return '⛅';
  if (score >= 40) return '🌥️';
  return '🌧️';
};

const getWeatherLabel = (score: number) => {
  if (score >= 80) return 'Zi Excelentă';
  if (score >= 60) return 'Zi Bună';
  if (score >= 40) return 'Zi Moderată';
  return 'Zi Dificilă';
};

const getInsight = (score: number) => {
  if (score >= 80) return 'Corpul tău e în formă maximă azi. Ideal pentru muncă creativă și decizii importante.';
  if (score >= 60) return 'Energie bună. Programează sarcinile grele dimineața, relaxează-te după prânz.';
  if (score >= 40) return 'Zi moderată. Evită suprasolicitarea și ia pauze scurte la fiecare oră.';
  return 'Corpul tău are nevoie de recuperare azi. Prioritizează somnul și hidratarea.';
};

const getAction = (score: number) => {
  if (score >= 80) return '💡 Profită de energie — programează cea mai importantă întâlnire azi.';
  if (score >= 60) return '🚶 Fă 15 minute de mers pe jos după prânz pentru a menține energia.';
  if (score >= 40) return '💧 Bea 2 pahare de apă acum și ia o pauză de 10 minute.';
  return '😴 Culcă-te cu 1 oră mai devreme în seara asta.';
};

// Simulăm un scor — îl vom înlocui cu date reale din Apple Health
const SCORE_DEMO = 72;

export default function HomeScreen() {
  const score = SCORE_DEMO;
  const emoji = getWeatherEmoji(score);
  const label = getWeatherLabel(score);
  const insight = getInsight(score);
  const action = getAction(score);
  const ora = new Date().getHours();
  const salut = ora < 12 ? 'Bună dimineața' : ora < 18 ? 'Bună ziua' : 'Bună seara';

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.salut}>{salut} 👋</Text>
        <Text style={styles.data}>
          {new Date().toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
        </Text>
      </View>

      {/* Card principal — Body Weather */}
      <View style={styles.cardPrincipal}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.scor}>{score}</Text>
        <Text style={styles.scorLabel}>din 100</Text>
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Insight */}
      <View style={styles.card}>
        <Text style={styles.cardTitlu}>🧠 Ce înseamnă asta</Text>
        <Text style={styles.cardText}>{insight}</Text>
      </View>

      {/* Acțiune */}
      <View style={[styles.card, styles.cardActiune]}>
        <Text style={styles.cardTitlu}>⚡ Acțiunea zilei</Text>
        <Text style={styles.cardText}>{action}</Text>
      </View>

      {/* Metrici */}
      <View style={styles.metriciContainer}>
        <View style={styles.metrica}>
          <Text style={styles.metricaEmoji}>😴</Text>
          <Text style={styles.metricaValoare}>7.2h</Text>
          <Text style={styles.metricaLabel}>Somn</Text>
        </View>
        <View style={styles.metrica}>
          <Text style={styles.metricaEmoji}>❤️</Text>
          <Text style={styles.metricaValoare}>58ms</Text>
          <Text style={styles.metricaLabel}>HRV</Text>
        </View>
        <View style={styles.metrica}>
          <Text style={styles.metricaEmoji}>🚶</Text>
          <Text style={styles.metricaValoare}>6,240</Text>
          <Text style={styles.metricaLabel}>Pași</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Actualizat azi la {new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 24,
  },
  salut: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  data: {
    fontSize: 14,
    color: '#888888',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  cardPrincipal: {
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  scor: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 80,
  },
  scorLabel: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  label: {
    fontSize: 20,
    color: '#a78bfa',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  cardActiune: {
    borderColor: '#a78bfa',
    backgroundColor: '#1a1a2e',
  },
  cardTitlu: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },
  metriciContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metrica: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  metricaEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  metricaValoare: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  metricaLabel: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  footer: {
    textAlign: 'center',
    color: '#444444',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 40,
  },
});
