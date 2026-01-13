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
  const router = useRouter();
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useProducts();
  const [addedId, setAddedId] = useState<number | null>(null);

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

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.price, { color: theme.primary }]}>
          € {item.price}
        </Text>
        <Text style={[styles.tap, { color: theme.textSecondary }]}>
          Tap to view details
        </Text>
      </View>
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
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
      <FlatList
        data={data?.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
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
