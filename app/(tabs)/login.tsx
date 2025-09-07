import AuthForm from "@/constants/AuthForm";
import React from "react";
import { View, Text } from "react-native";

export default function Login() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
     <AuthForm/>
    </View>
  );
}
