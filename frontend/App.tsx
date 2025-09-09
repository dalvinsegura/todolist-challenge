import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/core/navigation/RootStack";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/core/state/global";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
