import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { loginUser, registerUser } from "../src/store/slices/authSlice";

const screenWidth = Dimensions.get("window").width;

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { token, loading, error } = useAppSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={() => dispatch(registerUser({ email, password }))}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2196F3" }]}
        onPress={() => dispatch(loginUser({ email, password }))}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {loading && <Text style={styles.info}>Loading...</Text>}
      {error && <Text style={[styles.info, { color: "red" }]}>{error}</Text>}
      {token && <Text style={[styles.info, { color: "green" }]}>Logged in ✅</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:150 ,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#333",
  },
  input: {
    width: screenWidth - 40, // רוחב כמעט מלא עם שוליים
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: screenWidth - 40,
    alignSelf: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
