import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useProducts } from "../../src/hooks/queries/useProducts";
import { useAppSelector } from "../../src/store/hooks";
import { selectTheme } from "../../src/features/theme/themeSelectors";
import { Product } from "../../src/types/product";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useAppSelector(selectTheme);
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.error }}>Error loading products</Text>
      </View>
    );
  }

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
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={data?.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
});
