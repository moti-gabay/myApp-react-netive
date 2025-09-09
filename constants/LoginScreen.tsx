import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_URL } from "./url";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(tabs)/_layout";

type AuthGateNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
export default function LoginScreen() {
  const navigation = useNavigation<AuthGateNavigationProp>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(API_URL + "/auth/login", {
                email,
                password,
            });
            console.log(res)
            await AsyncStorage.setItem("token", res.data.token);
            setError("");
            navigation.replace("Home"); // מעבר למסך הבית
        } catch (err) {
            setError("❌ פרטי ההתחברות שגויים" + err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>התחברות</Text>

            <TextInput
                placeholder="אימייל"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="סיסמה"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>התחבר</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.linkText}>אין לך חשבון? הירשם</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 25,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        padding: 12,
        marginBottom: 15,
        borderRadius: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#2196F3",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    },
    linkButton: {
        marginTop: 20,
        alignItems: "center",
    },
    linkText: {
        color: "#007BFF",
        fontSize: 16,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
});
