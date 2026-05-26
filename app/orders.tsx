import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function OrdersScreen() {
  const { orders } = useCart();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>My Orders 📦</Text>

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Заказов пока нет</Text>
          <Text style={styles.emptyDesc}>Оформи первый заказ!</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>Заказ #{item.id.slice(-4)}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              {item.items.map((p, i) => (
                <Text key={i} style={styles.item}>
                  • {p.name} x{p.quantity} — ${p.price}
                </Text>
              ))}
              <Text style={styles.total}>Итого: ${item.total.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  back: { marginBottom: 8 },
  backText: { fontSize: 16, fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, fontWeight: "bold" },
  emptyDesc: { fontSize: 14, color: "#888", marginTop: 8 },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: { fontSize: 15, fontWeight: "bold" },
  date: { fontSize: 13, color: "#888" },
  item: { fontSize: 13, color: "#555", marginBottom: 4 },
  total: { fontSize: 15, fontWeight: "bold", marginTop: 8, color: "#000" },
});
