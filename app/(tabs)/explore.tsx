import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";

export default function CartScreen() {
  const { cart, removeFromCart, totalPrice, checkout } = useCart();

  const handleCheckout = () => {
    Alert.alert("✅ Заказ оформлен!", `Сумма: $${totalPrice.toFixed(2)}`, [
      { text: "OK", onPress: () => checkout() },
    ]);
  };

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>🛒 Корзина пустая</Text>
        <Text style={styles.emptyDesc}>Добавь товары из каталога</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart 🛒</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                ${item.price} x {item.quantity}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.btn} onPress={handleCheckout}>
          <Text style={styles.btnText}>Checkout ✅</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 22, fontWeight: "bold" },
  emptyDesc: { fontSize: 14, color: "#888", marginTop: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 14, color: "#888", marginTop: 4 },
  remove: { color: "red", fontWeight: "600" },
  footer: { borderTopWidth: 1, borderColor: "#eee", paddingTop: 16 },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  btn: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
