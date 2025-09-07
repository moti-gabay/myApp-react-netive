import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { loginUser, registerUser } from "../src/store/slices/authSlice";

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { token, loading, error } = useAppSelector((state) => state.auth);

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{ borderWidth: 1, marginBottom: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 1, padding: 8 }}
            />

            <Button title="Register" onPress={() => dispatch(registerUser({ email, password }))} />
            <Button title="Login" onPress={() => dispatch(loginUser({ email, password }))} />

            {loading && <Text>Loading...</Text>}
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            {token && <Text style={{ color: "green" }}>Logged in ✅</Text>}
        </View>
    );
}

