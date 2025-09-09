import { RootStackParamList } from "@/app/(tabs)/_layout";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_URL } from "./url";
type AuthGateNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;
export default function RegisterScreen() {
      const navigation = useNavigation<AuthGateNavigationProp>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async () => {
        try {
            const res = await axios.post(API_URL + "/auth/register", {
                name,
                email,
                password,
            });

            setSuccess("✅ נרשמת בהצלחה! אפשר להתחבר עכשיו");
            setError("");
            console.log(res)
            setTimeout(() => navigation.navigate("Login"), 1500);
        } catch (err) {
            setError("❌ שגיאה בהרשמה, נסה שוב" + err);
            setSuccess("");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>הרשמה</Text>

            <TextInput
                placeholder="שם מלא"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
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
            {success ? <Text style={styles.success}>{success}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>הירשם</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.linkText}>יש לך כבר חשבון? התחבר</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop:100,
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
        backgroundColor: "#4CAF50",
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
    success: {
        color: "green",
        textAlign: "center",
        marginBottom: 10,
    },
});
