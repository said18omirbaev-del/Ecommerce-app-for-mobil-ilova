import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function ProductScreen() {
  const router = useRouter();
  const { id, name, price, image, category, description } =
    useLocalSearchParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");

  const handleAddToCart = () => {
    addToCart({
      id: id as string,
      name: name as string,
      price: parseFloat(price as string),
      image: image as string,
    });
    Alert.alert("✅ Добавлено!", `${name} добавлен в корзину`);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: image as string }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.category}>{category || "Clothing"}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {description || "No description available."}
        </Text>

        <Text style={styles.sectionTitle}>Select Size</Text>
        <View style={styles.sizes}>
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeBtn,
                selectedSize === size && styles.sizeBtnActive,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.sizeTextActive,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Add to Cart 🛒</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  back: { padding: 16, paddingTop: 60 },
  backText: { fontSize: 16, fontWeight: "600" },
  image: { width: "100%", height: 350, backgroundColor: "#f0f0f0" },
  info: { padding: 20 },
  category: {
    fontSize: 13,
    color: "#aaa",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: { fontSize: 26, fontWeight: "bold" },
  price: { fontSize: 24, fontWeight: "700", color: "#000", marginTop: 8 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },
  description: { fontSize: 14, color: "#666", lineHeight: 22 },
  sizes: { flexDirection: "row", gap: 10 },
  sizeBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sizeBtnActive: { borderColor: "#000", backgroundColor: "#000" },
  sizeText: { fontSize: 14, fontWeight: "600", color: "#000" },
  sizeTextActive: { color: "#fff" },
  addBtn: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  addBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
