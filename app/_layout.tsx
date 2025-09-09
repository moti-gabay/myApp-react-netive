import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { Stack } from "expo-router";
import React from "react";
import AuthGate from "@/components/AuthGate";

export default function RootLayout() {

  return (
    <Provider store={store} >
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="editTask" options={{ title: "Edit Task" }} />
      </Stack>
    </Provider>
  );
}
