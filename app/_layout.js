import { Stack } from "expo-router";
import { SafeAreaBox, ThemeProvider } from "react-native-ficus-ui";

export default function HomeLayout() {
  return (
    <ThemeProvider
      theme={{
        colors: {
          brand: {
            50: "#f8ffde",
            100: "#edfbb2",
            200: "#e3f985",
            300: "#d8f655",
            400: "#cdf328",
            500: "#b3da12",
            600: "#8caa09",
            700: "#647903",
            800: "#3b4900",
            900: "#131900",
          },
        },
      }}
    >
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
