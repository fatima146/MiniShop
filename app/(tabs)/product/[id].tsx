import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useProduct } from "../../../src/hooks/queries/useProduct";
import { useAppSelector, useAppDispatch } from "../../../src/store/hooks";
import { selectTheme } from "../../../src/features/theme/themeSelectors";
import { addToCart } from "../../../src/features/cart/cartSlice";
import { toggleTheme } from "../../../src/features/theme/themeSlice";

export default function ProductDetailScreen() {
  // Haal product ID uit de URL (bijv. /product/5 → id = "5")
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Redux: haal theme kleuren en mode op
  const theme = useAppSelector(selectTheme);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  // TanStack Query: haal product data op
  const { data: product, isLoading, error } = useProduct(Number(id));

  // Lokale state voor UI feedback
  const [added, setAdded] = useState(false); // "Added!" feedback
  const [imageOpen, setImageOpen] = useState(false); // Modal open/dicht

  // Loading state
  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.error }}>Error loading product</Text>
      </View>
    );
  }

  // Voeg product toe aan cart + toon feedback
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Reset na 1.5 sec
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header met back knop en theme toggle */}
        <View
          style={[
            styles.header,
            { backgroundColor: theme.surface, borderBottomColor: theme.border },
          ]}
        >
          {/* Terug knop */}
          <Pressable onPress={() => router.back()} style={styles.headerBtn}>
            <Text style={[styles.headerBtnText, { color: theme.primary }]}>
              ← Back
            </Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Product
          </Text>
          {/* Theme toggle knop */}
          <Pressable
            onPress={() => dispatch(toggleTheme())}
            style={styles.headerBtn}
          >
            <Text style={[styles.headerBtnText, { color: theme.primary }]}>
              {themeMode === "light" ? "🌙" : "☀️"}
            </Text>
          </Pressable>
        </View>

        <ScrollView>
          {/* Product afbeelding - klikbaar om te vergroten */}
          <Pressable onPress={() => setImageOpen(true)}>
            <Image
              source={{ uri: product.thumbnail }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.tapHint, { color: theme.textSecondary }]}>
              Tap image to enlarge
            </Text>
          </Pressable>

          {/* Product info */}
          <View style={styles.content}>
            <Text style={[styles.title, { color: theme.text }]}>
              {product.title}
            </Text>
            <Text style={[styles.price, { color: theme.primary }]}>
              € {product.price}
            </Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {product.description}
            </Text>

            {/* Add to Cart knop - wordt groen na toevoegen */}
            <Pressable
              style={[
                styles.button,
                { backgroundColor: added ? theme.success : theme.primary },
              ]}
              onPress={handleAddToCart}
            >
              <Text style={styles.buttonText}>
                {added ? "Added!" : "Add to Cart"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* Modal voor vergrote afbeelding */}
      <Modal visible={imageOpen} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          {/* Sluit knop */}
          <Pressable
            style={styles.closeBtn}
            onPress={() => setImageOpen(false)}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>
          {/* Vergrote afbeelding */}
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerBtn: { padding: 8 },
  headerBtnText: { fontSize: 16, fontWeight: "600" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  image: { width: "100%", height: 250, backgroundColor: "#f5f5f5" },
  tapHint: { textAlign: "center", fontSize: 12, marginTop: 4 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  price: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  description: { fontSize: 16, lineHeight: 24, marginBottom: 24 },
  button: { padding: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: { width: "90%", height: "70%" },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: { color: "#fff", fontSize: 24, fontWeight: "600" },
});
