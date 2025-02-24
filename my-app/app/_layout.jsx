import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      {/* Login Screen (No Tabs Here) */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} // Hide header on login screen
      />

      {/* Main App with Tabs */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }} // Hide header for tab navigator
      />
    </Stack>
  );
};

export default Layout;
