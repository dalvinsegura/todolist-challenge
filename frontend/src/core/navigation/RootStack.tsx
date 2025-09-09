import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@features/Home/screens/HomeScreen";
import OnboardingScreen from "@features/onboarding/screens/OnboardingScreen";
import { Todo } from "@features/Home/models/Todo";
import TodoDetailedScreen from "@features/TodoDetailed/screens/TodoDetailedScreen";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  TodoDetail: { todo: Todo | null };
};

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TodoDetail" component={TodoDetailedScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
