import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>U</Text>
      </View>
      <Text style={styles.name}>Пользователь</Text>
      <Text style={styles.email}>user@email.com</Text>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/orders")}
        >
          <Text style={styles.itemText}>📦 My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/addresses")}
        >
          <Text style={styles.itemText}>📍 Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/wishlist")}
        >
          <Text style={styles.itemText}>❤️ Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/settings")}
        >
          <Text style={styles.itemText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  avatarText: { color: "#fff", fontSize: 36, fontWeight: "bold" },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 16 },
  email: { fontSize: 14, color: "#888", marginTop: 4 },
  menu: { width: "100%", marginTop: 32 },
  item: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemText: { fontSize: 16 },
  logoutBtn: {
    marginTop: 16,
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
