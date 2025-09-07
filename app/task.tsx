import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React from "react";

export default function TaskScreen() {
  const { id, text } = useLocalSearchParams<{ id: string; text: string }>();
  const [editedText, setEditedText] = useState(text ?? "");
  const router = useRouter();

  const saveTask = () => {
    router.replace({
      pathname: "/",
      params: { updatedId: id, updatedText: editedText },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✏️ עריכת משימה</Text>
      <Text style={styles.text}>מזהה: {id}</Text>

      <TextInput
        style={styles.input}
        value={editedText}
        onChangeText={setEditedText}
      />

      <Button title="💾 שמור" onPress={saveTask} />
      <Button title="⬅️ חזור" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  text: { fontSize: 18, marginVertical: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginVertical: 16,
    fontSize: 16,
  },
});
