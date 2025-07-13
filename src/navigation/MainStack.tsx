import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import WorkplaceFormScreen from "../screens/WorkplaceFormScreen";
import { Workplace } from "../types";
import MainTabs from "./MainTabs";

export type MainStackParamList = {
  MainTabs: undefined;
  WorkplaceForm: { workplace?: Workplace };
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="WorkplaceForm" component={WorkplaceFormScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
