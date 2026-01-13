import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "../src/store";
import { queryClient } from "../src/lib/queryClient";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
        </Stack>
      </QueryClientProvider>
    </Provider>
  );
}
