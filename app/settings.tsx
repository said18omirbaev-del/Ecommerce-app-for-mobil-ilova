import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>⚙️ Settings</Text>

      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.itemText}>🔔 Уведомления</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>🌙 Тёмная тема</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>🌐 Язык</Text>
          <Text style={styles.itemValue}>Русский</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>💰 Валюта</Text>
          <Text style={styles.itemValue}>USD</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  back: { marginBottom: 8 },
  backText: { fontSize: 16, fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  section: { backgroundColor: "#f5f5f5", borderRadius: 12, overflow: "hidden" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#e0e0e0",
  },
  itemText: { fontSize: 16 },
  itemValue: { fontSize: 14, color: "#888" },
});
