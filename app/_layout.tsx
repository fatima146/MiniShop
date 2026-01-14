import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../src/store";

// Maak TanStack Query client aan
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    // Provider = Redux wrapper, maakt store beschikbaar in hele app
    <Provider store={store}>
      {/* QueryClientProvider = TanStack Query wrapper, maakt queries mogelijk */}
      <QueryClientProvider client={queryClient}>
        {/* Stack = navigatie type (pagina's op elkaar gestapeld) */}
        <Stack>
          {/* (tabs) folder wordt geladen, header verborgen */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </Provider>
  );
}
