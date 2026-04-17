// constants/weatherStories.js
// Pool of daily "weather stories" shown on home screen
// Rotate deterministically by day number so the whole world sees the same story on the same day
// 8 stories per score level, in 8 languages
// Keep tone: gentle, poetic, non-clinical, no percentages or jargon

export const WEATHER_STORIES = {
  // Score 70+ : clear skies
  high: [
    {
      ro: 'Cer senin azi. Corpul tău îți spune că e o zi bună să începi ceva ce amâni.',
      en: "Clear skies today. Your body's telling you it's a good day to start what you've been putting off.",
      fr: 'Ciel dégagé aujourd\'hui. Votre corps vous dit que c\'est un bon jour pour commencer ce que vous repoussez.',
      de: 'Klarer Himmel heute. Dein Körper sagt dir, dass es ein guter Tag ist, um das anzufangen, was du aufgeschoben hast.',
      es: 'Cielo despejado hoy. Tu cuerpo te dice que es un buen día para empezar lo que has estado posponiendo.',
      it: 'Cielo sereno oggi. Il tuo corpo ti dice che è una buona giornata per iniziare ciò che rimandi.',
      pt: 'Céu limpo hoje. O seu corpo diz-lhe que é um bom dia para começar o que tem adiado.',
      zh: '今日晴空万里。你的身体在告诉你，这是开始那件一直拖延的事情的好日子。',
    },
    {
      ro: 'Lumină multă. Folosește-o pentru ce contează, nu pentru ce e urgent.',
      en: "Plenty of light. Use it for what matters, not for what's urgent.",
      fr: 'Beaucoup de lumière. Utilisez-la pour ce qui compte, pas pour ce qui est urgent.',
      de: 'Viel Licht. Nutze es für das, was zählt, nicht für das, was dringend ist.',
      es: 'Mucha luz. Úsala para lo que importa, no para lo urgente.',
      it: 'Tanta luce. Usala per ciò che conta, non per ciò che è urgente.',
      pt: 'Muita luz. Use-a para o que importa, não para o que é urgente.',
      zh: '阳光充足。用它做重要的事，而不是紧急的事。',
    },
    {
      ro: 'Vânt bun la spate. Nu toate zilele sunt așa — observă cum se simte.',
      en: 'Tailwind today. Not every day feels like this — notice how it feels.',
      fr: 'Vent arrière aujourd\'hui. Tous les jours ne sont pas ainsi — remarquez comment vous vous sentez.',
      de: 'Rückenwind heute. Nicht jeder Tag fühlt sich so an — nimm wahr, wie es sich anfühlt.',
      es: 'Viento a favor hoy. No todos los días se sienten así — nota cómo se siente.',
      it: 'Vento in poppa oggi. Non tutti i giorni sono così — nota come ti senti.',
      pt: 'Vento a favor hoje. Nem todos os dias são assim — repare como se sente.',
      zh: '今日顺风。不是每天都这样——留意这种感觉。',
    },
    {
      ro: 'Zi calmă și limpede. E o zi în care decizia grea nu mai pare grea.',
      en: 'Calm and clear. One of those days where the hard decision stops feeling hard.',
      fr: 'Calme et clair. Un de ces jours où la décision difficile cesse de paraître difficile.',
      de: 'Ruhig und klar. Einer dieser Tage, an denen die schwere Entscheidung nicht mehr schwer erscheint.',
      es: 'Calma y claridad. Uno de esos días en que la decisión difícil deja de parecer difícil.',
      it: 'Calma e chiarezza. Uno di quei giorni in cui la decisione difficile smette di sembrare difficile.',
      pt: 'Calma e clareza. Um daqueles dias em que a decisão difícil deixa de parecer difícil.',
      zh: '平静而清朗。正是那种艰难的决定不再那么艰难的日子。',
    },
    {
      ro: 'Corpul are rezerve azi. Cheltuiește-le în lucruri care contează peste o săptămână.',
      en: "Your body has reserves today. Spend them on things that'll still matter next week.",
      fr: 'Votre corps a des réserves aujourd\'hui. Dépensez-les pour ce qui comptera encore la semaine prochaine.',
      de: 'Dein Körper hat heute Reserven. Gib sie für Dinge aus, die nächste Woche noch zählen.',
      es: 'Tu cuerpo tiene reservas hoy. Gástalas en cosas que importarán la próxima semana.',
      it: 'Il tuo corpo ha riserve oggi. Spendile in cose che conteranno ancora la prossima settimana.',
      pt: 'O seu corpo tem reservas hoje. Gaste-as em coisas que ainda importarão na próxima semana.',
      zh: '今天你的身体有储备。把它花在一周后依然重要的事情上。',
    },
    {
      ro: 'Zi senină, dar nu o epuiza. Lasă ceva și pentru mâine.',
      en: 'A bright day, but don\'t spend it all. Leave something for tomorrow.',
      fr: 'Une belle journée, mais ne la dépensez pas entière. Gardez-en pour demain.',
      de: 'Ein heller Tag, aber nutz ihn nicht komplett. Lass etwas für morgen.',
      es: 'Un día luminoso, pero no lo gastes todo. Deja algo para mañana.',
      it: 'Una giornata luminosa, ma non spenderla tutta. Lascia qualcosa per domani.',
      pt: 'Um dia luminoso, mas não o gaste todo. Deixe algo para amanhã.',
      zh: '晴朗的一天，但别全部用光。为明天留一些。',
    },
    {
      ro: 'Totul e aliniat azi. E o stare — bucură-te de ea fără să-i cauți explicația.',
      en: "Everything's lined up today. It's just a state — enjoy it without needing to explain why.",
      fr: 'Tout est aligné aujourd\'hui. C\'est un état — profitez-en sans chercher d\'explication.',
      de: 'Heute ist alles im Einklang. Es ist ein Zustand — genieße ihn, ohne ihn erklären zu müssen.',
      es: 'Todo está alineado hoy. Es un estado — disfrútalo sin buscar explicación.',
      it: 'Tutto è allineato oggi. È uno stato — goditelo senza cercare spiegazioni.',
      pt: 'Tudo está alinhado hoje. É um estado — desfrute sem procurar explicação.',
      zh: '今天一切都对齐了。这只是一种状态——享受它，不必寻找原因。',
    },
    {
      ro: 'E o zi bună pentru a spune "da" cu grijă. Ai destulă energie pentru un angajament important.',
      en: 'A good day to say "yes" carefully. You have enough energy for one important commitment.',
      fr: 'Un bon jour pour dire "oui" avec soin. Vous avez assez d\'énergie pour un engagement important.',
      de: 'Ein guter Tag, um vorsichtig "Ja" zu sagen. Du hast genug Energie für eine wichtige Verpflichtung.',
      es: 'Un buen día para decir "sí" con cuidado. Tienes energía para un compromiso importante.',
      it: 'Una buona giornata per dire "sì" con cura. Hai abbastanza energia per un impegno importante.',
      pt: 'Um bom dia para dizer "sim" com cuidado. Tem energia para um compromisso importante.',
      zh: '今天适合谨慎地说"好"。你有足够的能量承担一件重要的事。',
    },
  ],

  // Score 45-69 : partly cloudy
  medium: [
    {
      ro: 'Zi variabilă. Nu o forța — lasă-o să curgă în ritmul ei.',
      en: 'A mixed day. Don\'t force it — let it move at its own pace.',
      fr: 'Journée variable. Ne la forcez pas — laissez-la avancer à son rythme.',
      de: 'Ein wechselhafter Tag. Zwinge ihn nicht — lass ihn in seinem Tempo laufen.',
      es: 'Un día variable. No lo fuerces — déjalo fluir a su propio ritmo.',
      it: 'Una giornata variabile. Non forzarla — lascia che scorra al suo ritmo.',
      pt: 'Um dia variável. Não o force — deixe fluir ao seu ritmo.',
      zh: '多变的一天。不要强求——让它按自己的节奏走。',
    },
    {
      ro: 'Cer schimbător. Sarcinile grele dimineața, ușurarea după prânz.',
      en: 'Changing skies. Hard tasks in the morning, lighter ones after lunch.',
      fr: 'Ciel changeant. Les tâches difficiles le matin, plus légères après le déjeuner.',
      de: 'Wechselhafter Himmel. Schwere Aufgaben am Morgen, leichtere nach dem Mittag.',
      es: 'Cielo cambiante. Las tareas difíciles por la mañana, las ligeras después del almuerzo.',
      it: 'Cielo variabile. Compiti difficili al mattino, più leggeri dopo pranzo.',
      pt: 'Céu variável. Tarefas difíceis de manhã, mais leves após o almoço.',
      zh: '天气多变。困难的任务放上午，轻松的放午后。',
    },
    {
      ro: 'E o zi medie, și asta e suficient. Nu orice zi trebuie să fie de vârf.',
      en: "It's a middle day, and that's enough. Not every day needs to be a peak.",
      fr: 'C\'est une journée moyenne, et c\'est suffisant. Toutes les journées ne doivent pas être des sommets.',
      de: 'Es ist ein mittlerer Tag, und das ist genug. Nicht jeder Tag muss ein Höhepunkt sein.',
      es: 'Es un día intermedio, y eso basta. No todo día tiene que ser una cumbre.',
      it: 'È una giornata intermedia, e basta. Non ogni giorno deve essere un picco.',
      pt: 'É um dia intermédio, e é suficiente. Nem todos os dias precisam ser de pico.',
      zh: '这是普通的一天，这就够了。不是每一天都必须是高峰。',
    },
    {
      ro: 'Nori dispersați. Fă lucrurile esențiale, lasă restul pentru când cerul se limpezește.',
      en: 'Scattered clouds. Do the essentials, leave the rest for when the sky clears.',
      fr: 'Nuages épars. Faites l\'essentiel, gardez le reste pour quand le ciel s\'éclaircira.',
      de: 'Vereinzelte Wolken. Mach das Wesentliche, den Rest, wenn der Himmel klar wird.',
      es: 'Nubes dispersas. Haz lo esencial, deja el resto para cuando el cielo se aclare.',
      it: 'Nuvole sparse. Fai l\'essenziale, lascia il resto per quando il cielo si schiarirà.',
      pt: 'Nuvens dispersas. Faça o essencial, deixe o resto para quando o céu clarear.',
      zh: '零星云朵。做必要的事，其余的等天晴再说。',
    },
    {
      ro: 'Corpul e pe jumătate acolo. Pauze scurte, apă, respirație. Ziua se îndreaptă.',
      en: 'Your body\'s halfway there. Short breaks, water, breath. The day will come around.',
      fr: 'Votre corps est à moitié là. Pauses courtes, eau, respiration. La journée va revenir.',
      de: 'Dein Körper ist halb da. Kurze Pausen, Wasser, Atem. Der Tag wird kommen.',
      es: 'Tu cuerpo está a medio camino. Pausas cortas, agua, respiración. El día va a mejorar.',
      it: 'Il tuo corpo è a metà strada. Pause brevi, acqua, respiro. La giornata si raddrizza.',
      pt: 'O seu corpo está a meio caminho. Pausas curtas, água, respiração. O dia vai melhorar.',
      zh: '身体只到了一半。短暂休息、喝水、呼吸。这一天会好起来。',
    },
    {
      ro: 'Vreme de tranziție. Nu e cea mai bună zi pentru decizii mari, dar e perfectă pentru pași mici.',
      en: "Transitional weather. Not the best day for big decisions, but perfect for small steps.",
      fr: 'Temps de transition. Pas la meilleure journée pour de grandes décisions, mais parfaite pour de petits pas.',
      de: 'Übergangswetter. Nicht der beste Tag für große Entscheidungen, aber perfekt für kleine Schritte.',
      es: 'Tiempo de transición. No el mejor día para grandes decisiones, pero perfecto para pasos pequeños.',
      it: 'Tempo di transizione. Non la giornata migliore per grandi decisioni, ma perfetta per piccoli passi.',
      pt: 'Tempo de transição. Não é o melhor dia para grandes decisões, mas é perfeito para pequenos passos.',
      zh: '过渡性天气。不是做重大决定的好日子，但适合迈出小步。',
    },
    {
      ro: 'Nu e o zi de împins. E o zi de menținut. Ambele sunt muncă.',
      en: "Not a day for pushing. A day for holding. Both are work.",
      fr: 'Pas une journée pour pousser. Une journée pour tenir. Les deux sont du travail.',
      de: 'Kein Tag zum Vorantreiben. Ein Tag zum Halten. Beides ist Arbeit.',
      es: 'No es un día de empujar. Es un día de mantener. Ambos son trabajo.',
      it: 'Non è un giorno per spingere. È un giorno per mantenere. Entrambi sono lavoro.',
      pt: 'Não é um dia de empurrar. É um dia de manter. Ambos são trabalho.',
      zh: '不是推进的日子。是守住的日子。两者都是努力。',
    },
    {
      ro: 'Vremea oscilează și corpul la fel. Observă, nu judeca.',
      en: 'The weather wavers, and so does the body. Notice, don\'t judge.',
      fr: 'Le temps hésite, le corps aussi. Observez, ne jugez pas.',
      de: 'Das Wetter schwankt, der Körper auch. Beobachte, urteile nicht.',
      es: 'El tiempo oscila, y el cuerpo también. Observa, no juzgues.',
      it: 'Il tempo oscilla, e così il corpo. Osserva, non giudicare.',
      pt: 'O tempo oscila, e o corpo também. Observe, não julgue.',
      zh: '天气起伏，身体亦然。观察，不评判。',
    },
  ],

  // Score <45 : stormy
  low: [
    {
      ro: 'Ploaia de azi nu e vina ta. Corpul cere odihnă — dă-i ce-i trebuie.',
      en: "Today\'s rain isn\'t your fault. Your body is asking for rest — give it what it needs.",
      fr: 'La pluie d\'aujourd\'hui n\'est pas votre faute. Le corps demande du repos — donnez-lui ce dont il a besoin.',
      de: 'Der Regen von heute ist nicht deine Schuld. Der Körper bittet um Ruhe — gib ihm, was er braucht.',
      es: 'La lluvia de hoy no es tu culpa. El cuerpo pide descanso — dale lo que necesita.',
      it: 'La pioggia di oggi non è colpa tua. Il corpo chiede riposo — dagli ciò che serve.',
      pt: 'A chuva de hoje não é culpa sua. O corpo pede descanso — dê-lhe o que precisa.',
      zh: '今天的雨不是你的错。身体在请求休息——给它所需要的。',
    },
    {
      ro: 'Nu e o zi pierdută. E o zi de reparație. E altceva.',
      en: "It\'s not a lost day. It\'s a repair day. That\'s different.",
      fr: 'Ce n\'est pas une journée perdue. C\'est une journée de réparation. C\'est différent.',
      de: 'Es ist kein verlorener Tag. Es ist ein Reparaturtag. Das ist etwas anderes.',
      es: 'No es un día perdido. Es un día de reparación. Es diferente.',
      it: 'Non è una giornata persa. È una giornata di riparazione. È un\'altra cosa.',
      pt: 'Não é um dia perdido. É um dia de reparação. É diferente.',
      zh: '这不是失去的一天。是修复的一天。不同。',
    },
    {
      ro: 'Furtună azi. Nu te certa cu ea — caută un loc uscat și așteaptă să treacă.',
      en: "Storm today. Don\'t argue with it — find a dry place and wait it out.",
      fr: 'Tempête aujourd\'hui. Ne la combattez pas — trouvez un endroit sec et attendez qu\'elle passe.',
      de: 'Sturm heute. Kämpfe nicht dagegen — finde einen trockenen Ort und warte ihn ab.',
      es: 'Tormenta hoy. No discutas con ella — busca un lugar seco y espera a que pase.',
      it: 'Tempesta oggi. Non combatterla — trova un posto asciutto e aspetta che passi.',
      pt: 'Tempestade hoje. Não lute com ela — encontre um lugar seco e espere passar.',
      zh: '今日有暴风。别与它对抗——找个干燥的地方等它过去。',
    },
    {
      ro: 'Corpul spune "mai puțin, nu mai mult". Crede-l.',
      en: 'Your body is saying "less, not more". Trust it.',
      fr: 'Le corps dit "moins, pas plus". Faites-lui confiance.',
      de: 'Der Körper sagt "weniger, nicht mehr". Vertrau ihm.',
      es: 'El cuerpo dice "menos, no más". Confía.',
      it: 'Il corpo dice "meno, non più". Fidati.',
      pt: 'O corpo diz "menos, não mais". Confie.',
      zh: '身体在说"少一点，不是多一点"。相信它。',
    },
    {
      ro: 'E o zi de scos lista scurtă. Trei lucruri, nu mai mult. Restul rămâne pentru altă zi.',
      en: "A short-list day. Three things, no more. The rest can wait.",
      fr: 'Journée à liste courte. Trois choses, pas plus. Le reste peut attendre.',
      de: 'Ein Kurzliste-Tag. Drei Dinge, nicht mehr. Der Rest kann warten.',
      es: 'Día de lista corta. Tres cosas, no más. El resto puede esperar.',
      it: 'Giornata da lista corta. Tre cose, non di più. Il resto può aspettare.',
      pt: 'Dia de lista curta. Três coisas, não mais. O resto pode esperar.',
      zh: '短清单的一天。三件事，不多。其余的可以等。',
    },
    {
      ro: 'Zilele grele fac parte din vreme. Fără ele n-am ști ce-i lumina.',
      en: "Hard days are part of the weather. Without them we wouldn\'t know what light is.",
      fr: 'Les jours durs font partie du temps. Sans eux, on ne saurait pas ce qu\'est la lumière.',
      de: 'Schwere Tage gehören zum Wetter. Ohne sie wüssten wir nicht, was Licht ist.',
      es: 'Los días duros son parte del clima. Sin ellos no sabríamos qué es la luz.',
      it: 'I giorni difficili fanno parte del tempo. Senza di essi non sapremmo cos\'è la luce.',
      pt: 'Os dias duros fazem parte do tempo. Sem eles não saberíamos o que é a luz.',
      zh: '艰难的日子也是天气的一部分。没有它们，我们不知光是什么。',
    },
    {
      ro: 'Fii blând cu tine azi. E cel mai greu și cel mai important lucru de făcut.',
      en: "Be gentle with yourself today. It\'s the hardest and most important thing to do.",
      fr: 'Soyez doux avec vous aujourd\'hui. C\'est la chose la plus difficile et la plus importante.',
      de: 'Sei heute sanft zu dir. Es ist das Schwerste und Wichtigste.',
      es: 'Sé amable contigo hoy. Es lo más difícil y lo más importante.',
      it: 'Sii gentile con te oggi. È la cosa più difficile e più importante.',
      pt: 'Seja gentil consigo hoje. É a coisa mais difícil e mais importante.',
      zh: '今天对自己温柔些。这是最难也最重要的事。',
    },
    {
      ro: 'Seara vine. Pune telefonul jos mai devreme. Lasă corpul să se repare.',
      en: 'Evening is coming. Put the phone down earlier. Let the body mend.',
      fr: 'Le soir arrive. Posez le téléphone plus tôt. Laissez le corps se réparer.',
      de: 'Der Abend kommt. Leg das Telefon früher weg. Lass den Körper heilen.',
      es: 'Llega la noche. Deja el teléfono antes. Deja que el cuerpo se repare.',
      it: 'Arriva la sera. Posa il telefono prima. Lascia che il corpo si ripari.',
      pt: 'A noite chega. Pouse o telefone mais cedo. Deixe o corpo reparar-se.',
      zh: '夜晚将至。早点放下手机。让身体修复。',
    },
  ],
};

// Gentle Returns — shown when user comes back after 2+ days of absence
// Zero shame, warm tone, inviting not guilting
export const GENTLE_RETURNS = {
  short: {
    // 1-3 days missed
    ro: 'Bun venit înapoi. Nu ne-am supărat.',
    en: "Welcome back. No grudge held.",
    fr: 'Bon retour. Sans rancune.',
    de: 'Willkommen zurück. Kein Groll.',
    es: 'Bienvenido de vuelta. Sin rencor.',
    it: 'Bentornato. Nessun rancore.',
    pt: 'Bem-vindo de volta. Sem ressentimento.',
    zh: '欢迎回来。没有介意。',
  },
  medium: {
    // 4-14 days missed
    ro: 'Ne bucurăm să te revedem. Hai să reluăm fără presiune.',
    en: "Good to see you again. Let\'s pick up without pressure.",
    fr: 'Content de vous revoir. Reprenons sans pression.',
    de: 'Schön, dich wiederzusehen. Lass uns ohne Druck weitermachen.',
    es: 'Me alegra volver a verte. Sigamos sin presión.',
    it: 'È bello rivederti. Riprendiamo senza pressione.',
    pt: 'Que bom ver-te outra vez. Vamos continuar sem pressão.',
    zh: '很高兴再次见到你。我们毫无压力地继续。',
  },
  long: {
    // 15+ days missed
    ro: 'A trecut o vreme. E ok. Cum te simți azi?',
    en: "It\'s been a while. That\'s ok. How do you feel today?",
    fr: 'Ça fait un moment. C\'est ok. Comment vous sentez-vous aujourd\'hui ?',
    de: 'Es ist eine Weile her. Ist ok. Wie fühlst du dich heute?',
    es: 'Ha pasado un tiempo. Está bien. ¿Cómo te sientes hoy?',
    it: 'È passato un po\'. Va bene. Come ti senti oggi?',
    pt: 'Passou algum tempo. Tudo bem. Como te sentes hoje?',
    zh: '有一段时间了。没关系。你今天感觉如何？',
  },
};

/**
 * Pick a story deterministically based on today's date + score bucket.
 * Everyone with the same score bucket sees the same story on the same day.
 * Rotates slowly — 8 stories means each repeats every 8 days per bucket.
 */
export function getWeatherStoryForToday(score, lang = 'en') {
  const bucket = score >= 70 ? 'high' : score >= 45 ? 'medium' : 'low';
  const pool = WEATHER_STORIES[bucket];

  // Day number since epoch, used as deterministic seed
  const msPerDay = 86400000;
  const dayNumber = Math.floor(Date.now() / msPerDay);

  const story = pool[dayNumber % pool.length];
  return story[lang] || story.en;
}

/**
 * Detect days of absence and return appropriate gentle return message, or null.
 */
export function getGentleReturn(history, lang = 'en') {
  if (!history || history.length < 2) return null;

  const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
  const mostRecent = sorted[0];
  if (!mostRecent) return null;

  const last = new Date(mostRecent.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today - last) / 86400000);

  if (diffDays < 2) return null;
  if (diffDays <= 3) return GENTLE_RETURNS.short[lang] || GENTLE_RETURNS.short.en;
  if (diffDays <= 14) return GENTLE_RETURNS.medium[lang] || GENTLE_RETURNS.medium.en;
  return GENTLE_RETURNS.long[lang] || GENTLE_RETURNS.long.en;
}

export default WEATHER_STORIES;
