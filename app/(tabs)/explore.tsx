import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBodyDataContext } from '../../contexts/BodyDataContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ExploreScreen() {
  const { liveScore } = useBodyDataContext();
  const { t, lang } = useLanguage();
  const score = liveScore.total;

  const tr = (ro: string, en: string, fr: string, de: string, es: string, it: string, pt: string, zh: string) => {
    if (lang === 'ro') return ro;
    if (lang === 'fr') return fr;
    if (lang === 'de') return de;
    if (lang === 'es') return es;
    if (lang === 'it') return it;
    if (lang === 'pt') return pt;
    if (lang === 'zh') return zh;
    return en;
  };

  const todayWord = tr('azi', 'today', "aujourd'hui", 'heute', 'hoy', 'oggi', 'hoje', '今天');

  const TIPS = {
    high: [
      {
        emoji: '🧠',
        title: tr('Zi de focus', 'Focus day', 'Journée de focus', 'Fokus-Tag', 'Día de enfoque', 'Giorno di focus', 'Dia de foco', '专注日'),
        body: tr(
          'Scorul tău e ridicat. Programează sarcinile cognitive grele dimineața când energia e la maxim.',
          'Your score is high. Schedule demanding cognitive tasks in the morning when energy peaks.',
          'Votre score est élevé. Planifiez les tâches cognitives exigeantes le matin quand l\'énergie est au maximum.',
          'Dein Score ist hoch. Plane anspruchsvolle kognitive Aufgaben morgens, wenn die Energie am höchsten ist.',
          'Tu puntuación es alta. Programa tareas cognitivas exigentes por la mañana cuando la energía está al máximo.',
          'Il tuo punteggio è alto. Pianifica i compiti cognitivi impegnativi la mattina quando l\'energia è al massimo.',
          'A sua pontuação é alta. Programe tarefas cognitivas exigentes de manhã quando a energia está no máximo.',
          '您的评分很高。在能量最高的早上安排繁重的认知任务。'
        ),
      },
      {
        emoji: '💡',
        title: tr('Decizii importante', 'Important decisions', 'Décisions importantes', 'Wichtige Entscheidungen', 'Decisiones importantes', 'Decisioni importanti', 'Decisões importantes', '重要决策'),
        body: tr(
          'Cu energie ridicată, creierul tău procesează mai bine informații complexe. Ideal pentru decizii strategice.',
          'With high energy, your brain processes complex information better. Ideal for strategic decisions.',
          'Avec une énergie élevée, votre cerveau traite mieux les informations complexes. Idéal pour les décisions stratégiques.',
          'Mit hoher Energie verarbeitet dein Gehirn komplexe Informationen besser. Ideal für strategische Entscheidungen.',
          'Con alta energía, tu cerebro procesa mejor la información compleja. Ideal para decisiones estratégicas.',
          'Con alta energia, il tuo cervello elabora meglio le informazioni complesse. Ideale per decisioni strategiche.',
          'Com alta energia, o seu cérebro processa melhor informações complexas. Ideal para decisões estratégicas.',
          '能量高时，您的大脑能更好地处理复杂信息。非常适合做战略决策。'
        ),
      },
      {
        emoji: '🏃',
        title: tr('Antrenament intens', 'Intense workout', 'Entraînement intense', 'Intensives Training', 'Entrenamiento intenso', 'Allenamento intenso', 'Treino intenso', '高强度训练'),
        body: tr(
          'Recovery-ul tău e bun azi. Poți face un antrenament mai solicitant fără riscul de suprasolicitare.',
          'Your recovery is good today. You can do a more demanding workout without risk of overtraining.',
          'Votre récupération est bonne aujourd\'hui. Vous pouvez faire un entraînement plus exigeant sans risque de surentraînement.',
          'Deine Erholung ist heute gut. Du kannst ein anspruchsvolleres Training machen ohne Übertraining.',
          'Tu recuperación es buena hoy. Puedes hacer un entrenamiento más exigente sin riesgo de sobreentrenamiento.',
          'Il tuo recupero è buono oggi. Puoi fare un allenamento più impegnativo senza rischio di sovrallenamento.',
          'A sua recuperação está boa hoje. Pode fazer um treino mais exigente sem risco de sobretreinamento.',
          '您今天的恢复状况良好。可以进行更高强度的训练而不会有过度训练的风险。'
        ),
      },
    ],
    medium: [
      {
        emoji: '🚶',
        title: tr('15 minute de mers', '15-minute walk', 'Marche de 15 minutes', '15 Minuten gehen', 'Caminar 15 minutos', 'Camminata di 15 minuti', 'Caminhada de 15 minutos', '步行15分钟'),
        body: tr(
          'O plimbare scurtă după masă îmbunătățește glicemia și menține energia constantă pe parcursul zilei.',
          'A short walk after meals improves blood sugar and keeps energy steady throughout the day.',
          'Une courte marche après les repas améliore la glycémie et maintient l\'énergie constante.',
          'Ein kurzer Spaziergang nach den Mahlzeiten verbessert den Blutzucker und hält die Energie konstant.',
          'Una caminata corta después de las comidas mejora el azúcar en sangre y mantiene la energía constante.',
          'Una breve passeggiata dopo i pasti migliora la glicemia e mantiene l\'energia costante.',
          'Uma curta caminhada após as refeições melhora o açúcar no sangue e mantém a energia constante.',
          '饭后短暂步行可改善血糖并保持全天能量稳定。'
        ),
      },
      {
        emoji: '💧',
        title: tr('Hidratare', 'Hydration', 'Hydratation', 'Hydration', 'Hidratación', 'Idratazione', 'Hidratação', '补水'),
        body: tr(
          'Deshidratarea de 2% reduce performanța cognitivă cu până la 20%. Bea un pahar de apă acum.',
          '2% dehydration reduces cognitive performance by up to 20%. Drink a glass of water now.',
          'Une déshydratation de 2% réduit les performances cognitives jusqu\'à 20%. Buvez un verre d\'eau maintenant.',
          '2% Dehydration reduziert die kognitive Leistung um bis zu 20%. Trinke jetzt ein Glas Wasser.',
          'Una deshidratación del 2% reduce el rendimiento cognitivo hasta un 20%. Bebe un vaso de agua ahora.',
          'Una disidratazione del 2% riduce le prestazioni cognitive fino al 20%. Bevi un bicchiere d\'acqua adesso.',
          'Uma desidratação de 2% reduz o desempenho cognitivo em até 20%. Beba um copo de água agora.',
          '2%的脱水会使认知能力下降多达20%。现在喝一杯水。'
        ),
      },
      {
        emoji: '😮‍💨',
        title: tr('Respirație 4-7-8', '4-7-8 Breathing', 'Respiration 4-7-8', '4-7-8 Atmung', 'Respiración 4-7-8', 'Respirazione 4-7-8', 'Respiração 4-7-8', '4-7-8呼吸法'),
        body: tr(
          'Inspiră 4 secunde, ține 7, expiră 8. Reduce cortizolul și reîncarcă energia în 2 minute.',
          'Inhale 4 seconds, hold 7, exhale 8. Reduces cortisol and recharges energy in 2 minutes.',
          'Inspirez 4 secondes, retenez 7, expirez 8. Réduit le cortisol et recharge l\'énergie en 2 minutes.',
          'Einatmen 4 Sekunden, halten 7, ausatmen 8. Reduziert Cortisol und lädt Energie in 2 Minuten auf.',
          'Inhala 4 segundos, mantén 7, exhala 8. Reduce el cortisol y recarga la energía en 2 minutos.',
          'Inspira 4 secondi, tieni 7, espira 8. Riduce il cortisolo e ricarica l\'energia in 2 minuti.',
          'Inspire 4 segundos, segure 7, expire 8. Reduz o cortisol e recarrega a energia em 2 minutos.',
          '吸气4秒，屏气7秒，呼气8秒。在2分钟内降低皮质醇并补充能量。'
        ),
      },
    ],
    low: [
      {
        emoji: '😴',
        title: tr('Prioritizează somnul', 'Prioritize sleep', 'Priorisez le sommeil', 'Schlaf priorisieren', 'Prioriza el sueño', 'Dai priorità al sonno', 'Priorize o sono', '优先保证睡眠'),
        body: tr(
          'Culcă-te cu 1 oră mai devreme. Un somn de calitate resetează complet scorul pentru mâine.',
          'Go to bed 1 hour earlier. Quality sleep completely resets your score for tomorrow.',
          'Couchez-vous 1 heure plus tôt. Un sommeil de qualité remet complètement à zéro votre score pour demain.',
          'Gehe 1 Stunde früher ins Bett. Qualitätsschlaf setzt deinen Score für morgen vollständig zurück.',
          'Acuéstate 1 hora antes. Un sueño de calidad restablece completamente tu puntuación para mañana.',
          'Vai a letto 1 ora prima. Un sonno di qualità reimposta completamente il tuo punteggio per domani.',
          'Deite-se 1 hora mais cedo. Um sono de qualidade redefine completamente a sua pontuação para amanhã.',
          '早睡1小时。优质睡眠能完全重置您明天的评分。'
        ),
      },
      {
        emoji: '🧘',
        title: tr('Pauze active', 'Active breaks', 'Pauses actives', 'Aktive Pausen', 'Pausas activas', 'Pause attive', 'Pausas ativas', '积极休息'),
        body: tr(
          'La fiecare oră, 5 minute de stretching sau mers. Previne acumularea de oboseală cronică.',
          'Every hour, 5 minutes of stretching or walking. Prevents chronic fatigue buildup.',
          'Chaque heure, 5 minutes d\'étirement ou de marche. Prévient l\'accumulation de fatigue chronique.',
          'Jede Stunde 5 Minuten dehnen oder gehen. Verhindert chronische Müdigkeit.',
          'Cada hora, 5 minutos de estiramiento o caminata. Previene la acumulación de fatiga crónica.',
          'Ogni ora, 5 minuti di stretching o camminata. Previene l\'accumulo di stanchezza cronica.',
          'A cada hora, 5 minutos de alongamento ou caminhada. Previne o acúmulo de fadiga crónica.',
          '每小时做5分钟拉伸或步行。防止慢性疲劳积累。'
        ),
      },
      {
        emoji: '🥗',
        title: tr('Mese ușoare', 'Light meals', 'Repas légers', 'Leichte Mahlzeiten', 'Comidas ligeras', 'Pasti leggeri', 'Refeições leves', '清淡饮食'),
        body: tr(
          'Evită mesele grele când ești obosit. Digestia consumă energie pe care corpul tău nu o are acum.',
          "Avoid heavy meals when tired. Digestion consumes energy your body doesn't have right now.",
          'Évitez les repas lourds quand vous êtes fatigué. La digestion consomme de l\'énergie que votre corps n\'a pas.',
          'Vermeide schwere Mahlzeiten wenn du müde bist. Die Verdauung verbraucht Energie die dein Körper nicht hat.',
          'Evita comidas pesadas cuando estás cansado. La digestión consume energía que tu cuerpo no tiene ahora.',
          'Evita i pasti pesanti quando sei stanco. La digestione consuma energia che il tuo corpo non ha ora.',
          'Evite refeições pesadas quando está cansado. A digestão consome energia que o seu corpo não tem agora.',
          '疲劳时避免吃重食。消化会消耗您身体现在没有的能量。'
        ),
      },
    ],
  };

  const HABITS = [
    {
      emoji: '🌅',
      title: tr('Expunere la lumină', 'Light exposure', 'Exposition à la lumière', 'Lichtexposition', 'Exposición a la luz', 'Esposizione alla luce', 'Exposição à luz', '光照'),
      body: tr(
        '10 minute de lumină naturală dimineața resetează ritmul circadian și îmbunătățește somnul nocturn.',
        '10 minutes of natural light in the morning resets your circadian rhythm and improves nighttime sleep.',
        '10 minutes de lumière naturelle le matin réinitialisent votre rythme circadien et améliorent le sommeil.',
        '10 Minuten natürliches Licht morgens setzt deinen zirkadianen Rhythmus zurück und verbessert den Schlaf.',
        '10 minutos de luz natural por la mañana restablecen tu ritmo circadiano y mejoran el sueño nocturno.',
        '10 minuti di luce naturale al mattino ripristinano il ritmo circadiano e migliorano il sonno notturno.',
        '10 minutos de luz natural de manhã repõem o ritmo circadiano e melhoram o sono noturno.',
        '早上10分钟自然光照可重置您的昼夜节律并改善夜间睡眠。'
      ),
    },
    {
      emoji: '📵',
      title: tr('Fără telefon înainte de somn', 'No phone before sleep', 'Pas de téléphone avant de dormir', 'Kein Telefon vor dem Schlafen', 'Sin teléfono antes de dormir', 'Niente telefono prima di dormire', 'Sem telefone antes de dormir', '睡前不用手机'),
      body: tr(
        'Lumina albastră suprimă melatonina cu 2 ore. Pune telefonul jos cu 1h înainte de culcare.',
        'Blue light suppresses melatonin for 2 hours. Put your phone down 1h before bed.',
        'La lumière bleue supprime la mélatonine pendant 2 heures. Posez votre téléphone 1h avant de dormir.',
        'Blaues Licht unterdrückt Melatonin für 2 Stunden. Lege dein Telefon 1h vor dem Schlafen weg.',
        'La luz azul suprime la melatonina durante 2 horas. Deja el teléfono 1h antes de dormir.',
        'La luce blu sopprime la melatonina per 2 ore. Metti giù il telefono 1h prima di dormire.',
        'A luz azul suprime a melatonina por 2 horas. Deixe o telefone 1h antes de dormir.',
        '蓝光会抑制褪黑素2小时。睡前1小时放下手机。'
      ),
    },
    {
      emoji: '🫁',
      title: tr('Respirație nazală', 'Nasal breathing', 'Respiration nasale', 'Nasenatmung', 'Respiración nasal', 'Respirazione nasale', 'Respiração nasal', '鼻式呼吸'),
      body: tr(
        'Respirația pe nas filtrează aerul, crește NO2 și îmbunătățește calitatea somnului cu 25%.',
        'Nasal breathing filters air, increases NO2 and improves sleep quality by 25%.',
        'La respiration nasale filtre l\'air, augmente le NO2 et améliore la qualité du sommeil de 25%.',
        'Nasenatmung filtert die Luft, erhöht NO2 und verbessert die Schlafqualität um 25%.',
        'La respiración nasal filtra el aire, aumenta el NO2 y mejora la calidad del sueño en un 25%.',
        'La respirazione nasale filtra l\'aria, aumenta il NO2 e migliora la qualità del sonno del 25%.',
        'A respiração nasal filtra o ar, aumenta o NO2 e melhora a qualidade do sono em 25%.',
        '鼻式呼吸可过滤空气，增加NO2，并将睡眠质量提高25%。'
      ),
    },
    {
      emoji: '❄️',
      title: tr('Duș rece 30 secunde', '30-second cold shower', 'Douche froide 30 secondes', '30 Sekunden kalte Dusche', 'Ducha fría 30 segundos', 'Doccia fredda 30 secondi', 'Duche frio 30 segundos', '冷水澡30秒'),
      body: tr(
        '30 de secunde de apă rece la final de duș crește dopamina cu 250% și energia pentru 3 ore.',
        '30 seconds of cold water at the end of your shower increases dopamine by 250% and energy for 3 hours.',
        '30 secondes d\'eau froide à la fin de la douche augmente la dopamine de 250% et l\'énergie pour 3 heures.',
        '30 Sekunden kaltes Wasser am Ende der Dusche erhöht Dopamin um 250% und Energie für 3 Stunden.',
        '30 segundos de agua fría al final de la ducha aumenta la dopamina un 250% y la energía por 3 horas.',
        '30 secondi di acqua fredda alla fine della doccia aumenta la dopamina del 250% e l\'energia per 3 ore.',
        '30 segundos de água fria no final do duche aumenta a dopamina em 250% e a energia por 3 horas.',
        '淋浴结束时30秒冷水可将多巴胺提高250%，能量持续3小时。'
      ),
    },
  ];

  const tips = score >= 70 ? TIPS.high : score >= 45 ? TIPS.medium : TIPS.low;
  const tipsTitle = score >= 70 ? t.optimizeDay : score >= 45 ? t.maintainEnergy : t.activeRecovery;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>💡 {t.exploreTitle}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tipsTitle}</Text>
        <Text style={styles.sectionSub}>{t.personalizedFor} {score} {todayWord}</Text>
        {tips.map((tip, i) => (
          <View key={i} style={styles.tipCard}>
            <Text style={styles.tipEmoji}>{tip.emoji}</Text>
            <View style={styles.tipInfo}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipBody}>{tip.body}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.dailyHabits}</Text>
        <Text style={styles.sectionSub}>{t.validForAnyScore}</Text>
        {HABITS.map((habit, i) => (
          <View key={i} style={styles.tipCard}>
            <Text style={styles.tipEmoji}>{habit.emoji}</Text>
            <View style={styles.tipInfo}>
              <Text style={styles.tipTitle}>{habit.title}</Text>
              <Text style={styles.tipBody}>{habit.body}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={[styles.scoreWidget, { borderColor: liveScore.color || '#6C63FF' }]}>
        <Text style={styles.scoreWidgetEmoji}>{liveScore.emoji}</Text>
        <Text style={[styles.scoreWidgetNumber, { color: liveScore.color || '#6C63FF' }]}>{score}</Text>
        <Text style={styles.scoreWidgetLabel}>{t.yourScoreToday}</Text>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12121f' },
  content: { padding: 20, paddingTop: Platform.OS === 'ios' ? 60 : 30 },
  pageTitle: { fontSize: 22, fontWeight: '700', color: '#e0e0f0', marginBottom: 24 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#e0e0f0', marginBottom: 4 },
  sectionSub: { fontSize: 13, color: '#555', marginBottom: 16 },
  tipCard: { flexDirection: 'row', backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, marginBottom: 10, alignItems: 'flex-start' },
  tipEmoji: { fontSize: 28, marginRight: 14, marginTop: 2 },
  tipInfo: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: '700', color: '#e0e0f0', marginBottom: 4 },
  tipBody: { fontSize: 13, color: '#888', lineHeight: 20 },
  scoreWidget: { alignItems: 'center', borderRadius: 16, borderWidth: 2, padding: 20, backgroundColor: '#1a1a2e', marginTop: 8 },
  scoreWidgetEmoji: { fontSize: 36, marginBottom: 8 },
  scoreWidgetNumber: { fontSize: 48, fontWeight: '800' },
  scoreWidgetLabel: { fontSize: 13, color: '#666', marginTop: 4 },
});