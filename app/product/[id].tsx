import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Product Detail: {id}</Text>
    </View>
  );
}
