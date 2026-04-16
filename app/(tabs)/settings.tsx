import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { cancelReminders, requestPermissions, scheduleDailyReminder } from '../../utils/notifications';

const REMINDER_KEY = 'bodyweather_reminder';
const REMINDER_HOUR_KEY = 'bodyweather_reminder_hour';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function SettingsScreen() {
  const { t, lang, changeLang, AVAILABLE_LANGUAGES } = useLanguage();
  const [showLangModal, setShowLangModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderHour, setReminderHour] = useState(21);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(REMINDER_KEY);
      if (stored !== null) setReminderEnabled(stored === 'true');
      const storedHour = await AsyncStorage.getItem(REMINDER_HOUR_KEY);
      if (storedHour !== null) setReminderHour(parseInt(storedHour, 10));
    })();
  }, []);

  const toggleReminder = async (val: boolean) => {
    setReminderEnabled(val);
    await AsyncStorage.setItem(REMINDER_KEY, String(val));
    if (val) {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert(
          t.notificationsDisabled || 'Notifications disabled',
          t.notificationsHelp || 'Enable notifications in your device settings to receive daily reminders.',
        );
        setReminderEnabled(false);
        await AsyncStorage.setItem(REMINDER_KEY, 'false');
        return;
      }
      await scheduleDailyReminder(lang, reminderHour);
    } else {
      await cancelReminders();
    }
  };

  const changeReminderHour = async (hour: number) => {
    setReminderHour(hour);
    setShowTimeModal(false);
    await AsyncStorage.setItem(REMINDER_HOUR_KEY, String(hour));
    if (reminderEnabled) {
      await scheduleDailyReminder(lang, hour);
    }
  };

  const formatHour = (h: number) => {
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:00 ${suffix}`;
  };

  const currentLang = AVAILABLE_LANGUAGES.find((l: { code: string }) => l.code === lang);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.settingsTitle}</Text>
      </View>

      {/* Language */}
      <Text style={styles.sectionTitle}>{t.settingsGeneral}</Text>
      <TouchableOpacity style={styles.row} onPress={() => setShowLangModal(true)} activeOpacity={0.7}>
        <Text style={styles.rowLabel}>🌐  {t.changeLanguage}</Text>
        <Text style={styles.rowValue}>{currentLang?.flag} {currentLang?.label}</Text>
      </TouchableOpacity>

      {/* Notifications */}
      <Text style={styles.sectionTitle}>{t.settingsNotifications}</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>🔔  {t.dailyReminder}</Text>
        <Switch
          value={reminderEnabled}
          onValueChange={toggleReminder}
          trackColor={{ false: '#333', true: '#6C63FF' }}
          thumbColor={reminderEnabled ? '#fff' : '#888'}
        />
      </View>
      <TouchableOpacity
        style={[styles.row, !reminderEnabled && styles.rowDisabled]}
        onPress={() => reminderEnabled && setShowTimeModal(true)}
        activeOpacity={reminderEnabled ? 0.7 : 1}
      >
        <Text style={[styles.rowLabel, !reminderEnabled && styles.rowLabelDisabled]}>
          🕘  {t.reminderTime}
        </Text>
        <Text style={[styles.rowValue, !reminderEnabled && styles.rowValueDisabled]}>
          {formatHour(reminderHour)}
        </Text>
      </TouchableOpacity>

      {/* App info */}
      <Text style={styles.sectionTitle}>{t.settingsAbout}</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>📱  {t.settingsVersion}</Text>
        <Text style={styles.rowValue}>1.0.0</Text>
      </View>

      {/* Language Modal */}
      <Modal visible={showLangModal} transparent animationType="slide" onRequestClose={() => setShowLangModal(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowLangModal(false)}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            <View style={styles.handleBar} />
            <Text style={styles.modalTitle}>🌐 {t.changeLanguage}</Text>
            <FlatList
              data={AVAILABLE_LANGUAGES}
              keyExtractor={(item: { code: string }) => item.code}
              renderItem={({ item }: { item: { code: string; label: string; flag: string } }) => {
                const isActive = item.code === lang;
                return (
                  <TouchableOpacity
                    style={[styles.langOption, isActive && styles.langOptionActive]}
                    onPress={() => { changeLang(item.code); setShowLangModal(false); }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.langFlag}>{item.flag}</Text>
                    <Text style={[styles.langOptionText, isActive && styles.langOptionTextActive]}>
                      {item.label}
                    </Text>
                    {isActive && <Text style={styles.langCheck}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Time Picker Modal */}
      <Modal visible={showTimeModal} transparent animationType="slide" onRequestClose={() => setShowTimeModal(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowTimeModal(false)}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            <View style={styles.handleBar} />
            <Text style={styles.modalTitle}>🕘 {t.reminderTime}</Text>
            <FlatList
              data={HOURS}
              keyExtractor={(item) => String(item)}
              renderItem={({ item }) => {
                const isActive = item === reminderHour;
                return (
                  <TouchableOpacity
                    style={[styles.langOption, isActive && styles.langOptionActive]}
                    onPress={() => changeReminderHour(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.langOptionText, isActive && styles.langOptionTextActive]}>
                      {formatHour(item)}
                    </Text>
                    {isActive && <Text style={styles.langCheck}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  header: { marginTop: 60, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  sectionTitle: { fontSize: 13, color: '#888888', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginTop: 24, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1a1a1a', borderRadius: 14, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: '#2a2a2a' },
  rowDisabled: { opacity: 0.4 },
  rowLabel: { fontSize: 16, color: '#ffffff' },
  rowLabelDisabled: { color: '#666' },
  rowValue: { fontSize: 15, color: '#a78bfa', fontWeight: '600' },
  rowValueDisabled: { color: '#555' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#1a1a2e', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 36 : 24, maxHeight: '75%' },
  handleBar: { width: 44, height: 4, borderRadius: 2, backgroundColor: '#444', alignSelf: 'center', marginTop: 12, marginBottom: 4 },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#e0e0f0', textAlign: 'center', marginVertical: 16 },
  langFlag: { fontSize: 22, marginRight: 12 },
  langOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 16, borderRadius: 14, backgroundColor: '#0f0f1e', marginBottom: 8 },
  langOptionActive: { backgroundColor: '#2d1f7a' },
  langOptionText: { flex: 1, fontSize: 15, color: '#ccc', fontWeight: '500' },
  langOptionTextActive: { color: '#fff', fontWeight: '700' },
  langCheck: { fontSize: 15, color: '#6C63FF', fontWeight: '700' },
});
