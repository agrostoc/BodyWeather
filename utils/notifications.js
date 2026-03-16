import * as Notifications from 'expo-notifications';

// Configurare comportament notificări
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Cere permisiuni
export async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Mesaje per limbă
const REMINDER_MESSAGES = {
  ro: 'Ai completat ziua de azi? 30 secunde și gata!',
  en: 'Did you log your day? 30 seconds and done!',
  fr: 'Avez-vous complété votre journée ? 30 secondes suffisent !',
  de: 'Hast du deinen Tag erfasst? 30 Sekunden und fertig!',
  es: '¿Completaste tu día? ¡30 segundos y listo!',
  it: 'Hai completato la tua giornata? 30 secondi e fatto!',
  pt: 'Completou o seu dia? 30 segundos e pronto!',
  zh: '您记录今天了吗？只需30秒！',
};

// Programează reminder zilnic la ora 21:00
export async function scheduleDailyReminder(lang = 'ro') {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const granted = await requestPermissions();
  if (!granted) return false;

  const body = REMINDER_MESSAGES[lang] || REMINDER_MESSAGES['en'];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'BodyWeather 🌤',
      body,
      sound: true,
    },
    trigger: {
  type: 'daily',
  hour: 21,
  minute: 0,
    },
  });

  return true;
}

// Anulează toate reminderele
export async function cancelReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}