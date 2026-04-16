import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBodyDataContext } from '../../contexts/BodyDataContext';
import { useLanguage } from '../../contexts/LanguageContext';

const getWeatherEmoji = (score: number) => {
  if (score >= 80) return '☀️';
  if (score >= 60) return '⛅';
  if (score >= 40) return '🌥️';
  return '🌧️';
};

function AnimatedScore({ target, color }: { target: number; color: string }) {
  const [displayed, setDisplayed] = useState(0);
  const animVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animVal.setValue(0);
    Animated.timing(animVal, {
      toValue: target,
      duration: 1200,
      useNativeDriver: false,
    }).start();
    const listener = animVal.addListener(({ value }) => {
      setDisplayed(Math.round(value));
    });
    return () => animVal.removeListener(listener);
  }, [target]);

  return <Text style={[styles.scor, { color }]}>{displayed}</Text>;
}

export default function HomeScreen() {
  const { liveScore, todayInputs, streak, history } = useBodyDataContext();
  const { t, lang } = useLanguage();

  const score = liveScore.total;
  const scoreColor = liveScore.color || '#a78bfa';
  const scoreEmoji = liveScore.emoji || getWeatherEmoji(score);
  const ora = new Date().getHours();
  const salut = ora < 12 ? t.goodMorning : ora < 18 ? t.goodAfternoon : t.goodEvening;

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

  const getLabel = () => {
    if (score >= 80) return t.excellent;
    if (score >= 60) return t.good;
    if (score >= 40) return t.moderate;
    return t.difficult;
  };

  const getInsight = () => {
    if (score >= 80) {
      if (lang === 'ro') return 'Corpul tău e în formă maximă azi. Ideal pentru muncă creativă și decizii importante.';
      if (lang === 'fr') return 'Votre corps est au top aujourd\'hui. Idéal pour le travail créatif et les décisions importantes.';
      if (lang === 'de') return 'Dein Körper ist heute in Topform. Ideal für kreative Arbeit und wichtige Entscheidungen.';
      if (lang === 'es') return 'Tu cuerpo está en su mejor momento hoy. Ideal para trabajo creativo y decisiones importantes.';
      if (lang === 'it') return 'Il tuo corpo è in forma oggi. Ideale per lavoro creativo e decisioni importanti.';
      if (lang === 'pt') return 'O seu corpo está em ótima forma hoje. Ideal para trabalho criativo e decisões importantes.';
      if (lang === 'zh') return '您的身体今天状态极佳。非常适合创意工作和重要决策。';
      return 'Your body is at peak performance today. Ideal for creative work and important decisions.';
    }
    if (score >= 60) {
      if (lang === 'ro') return 'Energie bună. Programează sarcinile grele dimineața, relaxează-te după prânz.';
      if (lang === 'fr') return 'Bonne énergie. Planifiez les tâches difficiles le matin, détendez-vous après le déjeuner.';
      if (lang === 'de') return 'Gute Energie. Plane schwere Aufgaben morgens, entspanne dich nach dem Mittagessen.';
      if (lang === 'es') return 'Buena energía. Programa las tareas difíciles por la mañana, relájate después del almuerzo.';
      if (lang === 'it') return 'Buona energia. Pianifica i compiti difficili la mattina, rilassati dopo pranzo.';
      if (lang === 'pt') return 'Boa energia. Programe as tarefas difíceis de manhã, relaxe depois do almoço.';
      if (lang === 'zh') return '能量良好。把困难的任务安排在上午，午饭后放松一下。';
      return 'Good energy. Schedule demanding tasks in the morning, relax after lunch.';
    }
    if (score >= 40) {
      if (lang === 'ro') return 'Zi moderată. Evită suprasolicitarea și ia pauze scurte la fiecare oră.';
      if (lang === 'fr') return 'Journée modérée. Évitez la surcharge et faites de courtes pauses toutes les heures.';
      if (lang === 'de') return 'Mäßiger Tag. Vermeide Überlastung und mache jede Stunde kurze Pausen.';
      if (lang === 'es') return 'Día moderado. Evita la sobrecarga y toma pausas cortas cada hora.';
      if (lang === 'it') return 'Giornata moderata. Evita il sovraccarico e fai brevi pause ogni ora.';
      if (lang === 'pt') return 'Dia moderado. Evite a sobrecarga e faça pausas curtas a cada hora.';
      if (lang === 'zh') return '状态一般。避免过度劳累，每小时休息一下。';
      return 'Moderate day. Avoid overexertion and take short breaks every hour.';
    }
    if (lang === 'ro') return 'Corpul tău are nevoie de recuperare azi. Prioritizează somnul și hidratarea.';
    if (lang === 'fr') return 'Votre corps a besoin de récupération aujourd\'hui. Privilégiez le sommeil et l\'hydratation.';
    if (lang === 'de') return 'Dein Körper braucht heute Erholung. Priorisiere Schlaf und Flüssigkeitszufuhr.';
    if (lang === 'es') return 'Tu cuerpo necesita recuperación hoy. Prioriza el sueño y la hidratación.';
    if (lang === 'it') return 'Il tuo corpo ha bisogno di recupero oggi. Dai priorità al sonno e all\'idratazione.';
    if (lang === 'pt') return 'O seu corpo precisa de recuperação hoje. Priorize o sono e a hidratação.';
    if (lang === 'zh') return '您的身体今天需要恢复。优先保证睡眠和补水。';
    return 'Your body needs recovery today. Prioritize sleep and hydration.';
  };

  const getAction = () => {
    if (score >= 80) {
      if (lang === 'ro') return '💡 Profită de energie — programează cea mai importantă întâlnire azi.';
      if (lang === 'fr') return '💡 Profitez de votre énergie — planifiez votre réunion la plus importante aujourd\'hui.';
      if (lang === 'de') return '💡 Nutze deine Energie — plane dein wichtigstes Meeting heute.';
      if (lang === 'es') return '💡 Aprovecha tu energía — programa tu reunión más importante hoy.';
      if (lang === 'it') return '💡 Sfrutta la tua energia — pianifica il tuo incontro più importante oggi.';
      if (lang === 'pt') return '💡 Aproveite a sua energia — agende a sua reunião mais importante hoje.';
      if (lang === 'zh') return '💡 利用您的能量——今天安排最重要的会议。';
      return '💡 Leverage your energy — schedule your most important meeting today.';
    }
    if (score >= 60) {
      if (lang === 'ro') return '🚶 Fă 15 minute de mers pe jos după prânz pentru a menține energia.';
      if (lang === 'fr') return '🚶 Faites 15 minutes de marche après le déjeuner pour maintenir votre énergie.';
      if (lang === 'de') return '🚶 Gehe nach dem Mittagessen 15 Minuten spazieren, um deine Energie zu erhalten.';
      if (lang === 'es') return '🚶 Camina 15 minutos después del almuerzo para mantener tu energía.';
      if (lang === 'it') return '🚶 Cammina 15 minuti dopo pranzo per mantenere la tua energia.';
      if (lang === 'pt') return '🚶 Caminhe 15 minutos após o almoço para manter a sua energia.';
      if (lang === 'zh') return '🚶 午饭后步行15分钟以保持能量。';
      return '🚶 Take a 15-minute walk after lunch to maintain your energy.';
    }
    if (score >= 40) {
      if (lang === 'ro') return '💧 Bea 2 pahare de apă acum și ia o pauză de 10 minute.';
      if (lang === 'fr') return '💧 Buvez 2 verres d\'eau maintenant et faites une pause de 10 minutes.';
      if (lang === 'de') return '💧 Trinke jetzt 2 Gläser Wasser und mache eine 10-minütige Pause.';
      if (lang === 'es') return '💧 Bebe 2 vasos de agua ahora y toma un descanso de 10 minutos.';
      if (lang === 'it') return '💧 Bevi 2 bicchieri d\'acqua ora e fai una pausa di 10 minuti.';
      if (lang === 'pt') return '💧 Beba 2 copos de água agora e faça uma pausa de 10 minutos.';
      if (lang === 'zh') return '💧 现在喝2杯水，休息10分钟。';
      return '💧 Drink 2 glasses of water now and take a 10-minute break.';
    }
    if (lang === 'ro') return '😴 Culcă-te cu 1 oră mai devreme în seara asta.';
    if (lang === 'fr') return '😴 Couchez-vous 1 heure plus tôt ce soir.';
    if (lang === 'de') return '😴 Gehe heute Abend 1 Stunde früher ins Bett.';
    if (lang === 'es') return '😴 Acuéstate 1 hora antes esta noche.';
    if (lang === 'it') return '😴 Vai a letto 1 ora prima stasera.';
    if (lang === 'pt') return '😴 Deite-se 1 hora mais cedo esta noite.';
    if (lang === 'zh') return '😴 今晚早睡1小时。';
    return '😴 Go to bed 1 hour earlier tonight.';
  };

  const hasTodayEntry = history.some(
    (e: { date: string }) => e.date === new Date().toISOString().split('T')[0]
  );

  const getStreakMotivation = () => {
    if (streak >= 30) return t.streakMotivation30;
    if (streak >= 14) return t.streakMotivation14;
    if (streak >= 7) return t.streakMotivation7;
    if (streak >= 3) return t.streakMotivation3;
    return t.streakMotivation1;
  };

  const streakFireEmoji = streak >= 30 ? '🏆' : streak >= 14 ? '🔥🔥' : streak >= 7 ? '🔥' : '✨';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.header}>
          <Text style={styles.salut}>{salut} 👋</Text>
          <Text style={styles.data}>
            {new Date().toLocaleDateString(getLocale(), { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
        </View>

        <View style={[styles.cardPrincipal, { borderColor: scoreColor }]}>
          <Text style={styles.emoji}>{scoreEmoji}</Text>
          <AnimatedScore target={score} color="#ffffff" />
          <Text style={styles.scorLabel}>{t.score}</Text>
          <Text style={[styles.label, { color: scoreColor }]}>{getLabel()}</Text>
        </View>

        {hasTodayEntry && (
          <View style={styles.streakCard}>
            <Text style={styles.streakFire}>{streakFireEmoji}</Text>
            <View style={styles.streakInfo}>
              <Text style={styles.streakNumber}>{streak}</Text>
              <Text style={styles.streakLabel}>
                {streak === 1 ? t.streakDay : t.streakDays}
              </Text>
            </View>
            <Text style={styles.streakMotivation}>{getStreakMotivation()}</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitlu}>🧠 {t.whatItMeans}</Text>
          <Text style={styles.cardText}>{getInsight()}</Text>
        </View>

        <View style={[styles.card, styles.cardActiune]}>
          <Text style={styles.cardTitlu}>⚡ {t.actionOfDay}</Text>
          <Text style={styles.cardText}>{getAction()}</Text>
        </View>

        <View style={styles.metriciContainer}>
          <View style={styles.metrica}>
            <Text style={styles.metricaEmoji}>😴</Text>
            <Text style={styles.metricaValoare}>{todayInputs.sleepHours}h</Text>
            <Text style={styles.metricaLabel}>{t.sleep}</Text>
          </View>
          <View style={styles.metrica}>
            <Text style={styles.metricaEmoji}>✨</Text>
            <Text style={styles.metricaValoare}>{todayInputs.sleepQuality}/5</Text>
            <Text style={styles.metricaLabel}>{t.quality}</Text>
          </View>
          <View style={styles.metrica}>
            <Text style={styles.metricaEmoji}>⚡</Text>
            <Text style={styles.metricaValoare}>{todayInputs.energy}/10</Text>
            <Text style={styles.metricaLabel}>{t.energy}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          {t.updatedAt} {new Date().toLocaleTimeString(getLocale(), { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Animated.View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  header: { marginTop: 60, marginBottom: 24 },
  salut: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  data: { fontSize: 14, color: '#888888', marginTop: 4, textTransform: 'capitalize' },
  cardPrincipal: { backgroundColor: '#1a1a2e', borderRadius: 24, padding: 32, alignItems: 'center', marginBottom: 16, borderWidth: 2 },
  emoji: { fontSize: 64, marginBottom: 8 },
  scor: { fontSize: 72, fontWeight: 'bold', lineHeight: 80 },
  scorLabel: { fontSize: 14, color: '#888888', marginBottom: 8 },
  label: { fontSize: 20, fontWeight: '600' },
  streakCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a2e', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#ff8c00' },
  streakFire: { fontSize: 28, marginRight: 12 },
  streakInfo: { alignItems: 'center', marginRight: 12 },
  streakNumber: { fontSize: 28, fontWeight: 'bold', color: '#ff8c00' },
  streakLabel: { fontSize: 11, color: '#888888', marginTop: 2 },
  streakMotivation: { flex: 1, fontSize: 14, color: '#cccccc', lineHeight: 20 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: '#2a2a2a' },
  cardActiune: { borderColor: '#a78bfa', backgroundColor: '#1a1a2e' },
  cardTitlu: { fontSize: 13, color: '#888888', marginBottom: 8, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  cardText: { fontSize: 16, color: '#ffffff', lineHeight: 24 },
  metriciContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  metrica: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 16, alignItems: 'center', flex: 1, marginHorizontal: 4, borderWidth: 1, borderColor: '#2a2a2a' },
  metricaEmoji: { fontSize: 24, marginBottom: 4 },
  metricaValoare: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  metricaLabel: { fontSize: 12, color: '#888888', marginTop: 2 },
  footer: { textAlign: 'center', color: '#444444', fontSize: 12, marginTop: 8, marginBottom: 40 },
});