import { Text } from "react-native";
import { Tabs } from "expo-router";
import { useAppSelector } from "../../src/store/hooks";
import { selectTheme } from "../../src/features/theme/themeSelectors";

export default function TabsLayout() {
  const theme = useAppSelector(selectTheme);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: { backgroundColor: theme.surface },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🛒</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null, // Verberg uit tab bar
        }}
      />
    </Tabs>
  );
}
