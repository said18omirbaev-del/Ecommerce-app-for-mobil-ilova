import { useRouter } from "expo-router";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>❤️ Wishlist</Text>

      {wishlist.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyText}>Список желаний пуст</Text>
          <Text style={styles.emptyDesc}>
            Добавляй товары которые нравятся!
          </Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: any) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addBtnText}>+ В корзину</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                <Text style={styles.remove}>❌</Text>
              </TouchableOpacity>
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
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: "#888" },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: { width: 70, height: 70, borderRadius: 8, backgroundColor: "#e0e0e0" },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: "600" },
  price: { fontSize: 14, color: "#888", marginTop: 2 },
  addBtn: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
  },
  addBtnText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  remove: { fontSize: 18, marginLeft: 8 },
});
