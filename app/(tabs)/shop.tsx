import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";

export default function ShopScreen() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://192.168.137.110:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (item: any) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop 🛍️</Text>
      <TextInput
        style={styles.search}
        placeholder="🔍 Поиск товаров..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item: any) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
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
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  row: { justifyContent: "space-between", marginBottom: 16 },
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
    height: 120,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
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
