import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import { selectTheme } from "../../src/features/theme/themeSelectors";
import {
  selectTotalItems,
  selectSubtotal,
} from "../../src/features/cart/cartSelectors";
import { toggleTheme } from "../../src/features/theme/themeSlice";

export default function ProfileScreen() {
  // Router voor navigatie naar cart
  const router = useRouter();

  // Redux: haal theme kleuren en mode op
  const theme = useAppSelector(selectTheme);
  const themeMode = useAppSelector((state) => state.theme.mode); // 'light' of 'dark'
  const dispatch = useAppDispatch();

  // Redux: haal cart data op via selectors
  const totalItems = useAppSelector(selectTotalItems); // Totaal aantal items in cart
  const subtotal = useAppSelector(selectSubtotal); // Totaalprijs van cart

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header met student naam */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <Text style={styles.name}>Fatima Salamova</Text>
        <Text style={styles.subtitle}>Effinia</Text>
      </View>

      {/* Theme Toggle kaart */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Appearance
        </Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Theme
          </Text>
          {/* Toggle knop - wisselt tussen light en dark */}
          <Pressable
            style={[styles.toggleBtn, { backgroundColor: theme.primary }]}
            onPress={() => dispatch(toggleTheme())} // Dispatch Redux action
          >
            <Text style={styles.toggleText}>
              {themeMode === "light" ? "☀️ Light" : "🌙 Dark"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Cart Summary kaart - toont cross-tab proof */}
      {/* Dit bewijst dat Redux werkt over alle tabs heen */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Cart Summary
        </Text>

        {/* Totaal items - gebruikt selector */}
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Total items
          </Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {totalItems}
          </Text>
        </View>

        {/* Subtotaal - gebruikt selector */}
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Subtotal
          </Text>
          <Text style={[styles.value, { color: theme.primary }]}>
            € {subtotal.toFixed(2)}
          </Text>
        </View>

        {/* Go to Cart knop - navigeert naar cart tab */}
        <Pressable
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => router.push("/cart")}
        >
          <Text style={styles.buttonText}>Go to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 32, paddingTop: 60, alignItems: "center" },
  name: { fontSize: 28, fontWeight: "700", color: "#fff" },
  subtitle: { fontSize: 16, color: "#fff", opacity: 0.9, marginTop: 4 },
  card: { margin: 16, padding: 16, borderRadius: 12, borderWidth: 1 },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: { fontSize: 16 },
  value: { fontSize: 18, fontWeight: "600" },
  toggleBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  toggleText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  button: { marginTop: 8, padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
