import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart, addToWishlist } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.137.110:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Добро пожаловать! 👋</Text>
          <Text style={styles.subtitle}>Найди что-то особенное</Text>
        </View>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Новая коллекция</Text>
        <Text style={styles.bannerSubtitle}>Скидки до 30% на всё!</Text>
      </View>

      <Text style={styles.sectionTitle}>New Arrivals</Text>
      <View style={styles.grid}>
        {products.map((item: any) => (
          <View key={item._id} style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/product",
                  params: {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                    description: item.description,
                  },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wishlistBtn}
              onPress={() =>
                addToWishlist({
                  id: item._id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                })
              }
            >
              <Text>❤️</Text>
            </TouchableOpacity>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() =>
                addToCart({
                  id: item._id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                })
              }
            >
              <Text style={styles.addBtnText}>+ В корзину</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  greeting: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#888", marginTop: 2 },
  banner: {
    margin: 16,
    backgroundColor: "#000",
    borderRadius: 16,
    padding: 24,
  },
  bannerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  bannerSubtitle: { color: "#aaa", fontSize: 14, marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  wishlistBtn: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  categoryBadge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  categoryText: { fontSize: 10, color: "#666" },
  name: { fontSize: 14, fontWeight: "600", marginTop: 6 },
  price: { fontSize: 14, fontWeight: "bold", color: "#000", marginTop: 2 },
  addBtn: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
    marginTop: 8,
  },
  addBtnText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
