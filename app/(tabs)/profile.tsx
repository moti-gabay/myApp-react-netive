import { LogoutButton } from "@/components/LogoutBtn";
import React from "react";
import { View, Text } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LogoutButton/>
      <Text>👤 דף פרופיל</Text>
    </View>
  );
}
