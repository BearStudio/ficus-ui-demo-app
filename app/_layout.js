import { Stack } from "expo-router";
import { SafeAreaBox, ThemeProvider } from "react-native-ficus-ui";

export default function HomeLayout() {
  return (
    <ThemeProvider>
      <SafeAreaBox flex={1}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "white" },
          }}
        />
      </SafeAreaBox>
    </ThemeProvider>
  );
}
