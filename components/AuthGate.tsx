import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import api from "../constants/request"; // ה-import של האינסטנס שלנו

export default function AuthGate({ navigation }: any) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get("/me");
                console.log("User is logged in:", res.data.user);
                navigation.replace("Home"); // נווט למסך הבית
            } catch (err) {
                console.log("User not logged in");
                navigation.replace("Login"); // נווט למסך התחברות
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return null;
}
