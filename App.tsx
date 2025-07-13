import "react-native-gesture-handler";
import "nativewind";
import "./global.css";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "./src/components/shared/ui/ToastProvider";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <AppNavigator />
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
