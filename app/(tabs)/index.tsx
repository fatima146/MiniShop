import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProducts } from "../../src/hooks/queries/useProducts";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import { selectTheme } from "../../src/features/theme/themeSelectors";
import { addToCart } from "../../src/features/cart/cartSlice";
import { Product } from "../../src/types/product";

export default function HomeScreen() {
  // Router voor navigatie naar product detail
  const router = useRouter();

  // Redux: haal theme kleuren op
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  // TanStack Query: haal producten op van API
  // data = producten, isLoading = aan het laden, error = fout opgetreden
  const { data, isLoading, error } = useProducts();

  // Lokale state: welk product is net toegevoegd (voor ✓ feedback)
  const [addedId, setAddedId] = useState<number | null>(null);

  // LOADING STATE: spinner tonen tijdens laden
  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: theme.background }]}
        edges={["top"]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  // ERROR STATE: foutmelding tonen als API faalt
  if (error) {
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: theme.background }]}
        edges={["top"]}
      >
        <Text style={{ color: theme.error }}>Error loading products</Text>
      </SafeAreaView>
    );
  }

  // Voeg product toe aan cart + toon feedback
  const handleAddToCart = (product: Product) => {
    // Dispatch Redux action met product data
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );
    // Toon ✓ voor dit product
    setAddedId(product.id);
    // Reset na 1 seconde (terug naar +)
    setTimeout(() => setAddedId(null), 1000);
  };

  // Render functie voor elk product in de lijst
  const renderProduct = ({ item }: { item: Product }) => (
    // Hele kaart is klikbaar - gaat naar product detail
    <Pressable
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      {/* Product afbeelding */}
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      {/* Product info */}
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.price, { color: theme.primary }]}>
          € {item.price}
        </Text>
        <Text style={[styles.tap, { color: theme.textSecondary }]}>
          Tap to view details
        </Text>
      </View>

      {/* Add to cart knop */}
      {/* Wordt groen (success) met ✓ na toevoegen */}
      <Pressable
        style={[
          styles.addBtn,
          {
            backgroundColor:
              addedId === item.id ? theme.success : theme.primary,
          },
        ]}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addBtnText}>{addedId === item.id ? "✓" : "+"}</Text>
      </Pressable>
    </Pressable>
  );

  // NORMAL STATE: toon producten lijst
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]} // Padding alleen bovenaan (voor notch/statusbar)
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.surface, borderBottomColor: theme.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          MiniShop
        </Text>
      </View>

      {/* Producten lijst */}
      <FlatList
        data={data?.products} // Array van producten
        renderItem={renderProduct} // Hoe elk item eruitziet
        keyExtractor={(item) => item.id.toString()} // Unieke key per item
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { padding: 16, borderBottomWidth: 1, alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  card: {
    flexDirection: "row",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  price: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  tap: { fontSize: 12 },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontSize: 20, fontWeight: "600" },
});
