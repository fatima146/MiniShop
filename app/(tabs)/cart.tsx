import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import { selectTheme } from "../../src/features/theme/themeSelectors";
import {
  selectTotalItems,
  selectSubtotal,
} from "../../src/features/cart/cartSelectors";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../src/features/cart/cartSlice";
import { CartItem } from "../../src/features/cart/cartTypes";

export default function CartScreen() {
  // Router voor navigatie naar product detail
  const router = useRouter();

  // Redux: haal theme kleuren op
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  // Redux: haal cart data op
  const cartItems = useAppSelector((state) => state.cart.items); // Alle items
  const totalItems = useAppSelector(selectTotalItems); // Totaal aantal (selector)
  const subtotal = useAppSelector(selectSubtotal); // Totaalprijs (selector)

  // Render functie voor elk cart item
  const renderItem = ({ item }: { item: CartItem }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      {/* Klikbare afbeelding - gaat naar product detail */}
      <Pressable onPress={() => router.push(`/product/${item.id}`)}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
      </Pressable>

      <View style={styles.info}>
        {/* Klikbare titel - gaat naar product detail */}
        <Pressable onPress={() => router.push(`/product/${item.id}`)}>
          <Text style={[styles.title, { color: theme.text }]}>
            {item.title}
          </Text>
        </Pressable>

        <Text style={[styles.price, { color: theme.primary }]}>
          € {item.price}
        </Text>

        {/* Quantity knoppen: - en + */}
        <View style={styles.actions}>
          {/* Minus knop - verlaagt quantity of verwijdert als 1 */}
          <Pressable
            onPress={() => dispatch(decrementQuantity(item.id))}
            style={[styles.btn, { backgroundColor: theme.border }]}
          >
            <Text style={[styles.btnText, { color: theme.text }]}>-</Text>
          </Pressable>

          {/* Huidige quantity */}
          <Text style={[styles.qty, { color: theme.text }]}>
            {item.quantity}
          </Text>

          {/* Plus knop - verhoogt quantity */}
          <Pressable
            onPress={() => dispatch(incrementQuantity(item.id))}
            style={[styles.btn, { backgroundColor: theme.border }]}
          >
            <Text style={[styles.btnText, { color: theme.text }]}>+</Text>
          </Pressable>
        </View>
      </View>

      {/* Remove knop - verwijdert item volledig */}
      <Pressable onPress={() => dispatch(removeFromCart(item.id))}>
        <Text style={{ color: theme.error }}>Remove</Text>
      </Pressable>
    </View>
  );

  // EMPTY STATE: als cart leeg is
  if (cartItems.length === 0) {
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
          <Text style={[styles.headerTitle, { color: theme.text }]}>Cart</Text>
        </View>
        <View style={styles.center}>
          <Text style={{ color: theme.textSecondary }}>Your cart is empty</Text>
        </View>
      </SafeAreaView>
    );
  }

  // NORMAL STATE: cart heeft items
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Cart</Text>
      </View>

      {/* Summary kaart met totalen */}
      <View
        style={[
          styles.summary,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.summaryText, { color: theme.text }]}>
          Total items: {totalItems}
        </Text>
        <Text style={[styles.summaryTotal, { color: theme.primary }]}>
          Subtotal: € {subtotal.toFixed(2)}
        </Text>
      </View>

      {/* Lijst van cart items */}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  summary: { padding: 16, margin: 16, borderRadius: 12, borderWidth: 1 },
  summaryText: { fontSize: 16 },
  summaryTotal: { fontSize: 20, fontWeight: "700", marginTop: 4 },
  card: {
    flexDirection: "row",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 14, fontWeight: "600" },
  price: { fontSize: 16, fontWeight: "700" },
  actions: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  btn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontSize: 18, fontWeight: "600" },
  qty: { marginHorizontal: 12, fontSize: 16 },
});
