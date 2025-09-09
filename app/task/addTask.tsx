// app/addTask.tsx
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useAppDispatch } from "../../src/store/hooks";
import { addTaskAsync } from "../../src/store/slices/taskSlice";
import { useRouter } from "expo-router";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    try {
      await dispatch(addTaskAsync(title)); // שולח לשרת ושומר ב־Redux
      setTitle(""); // מנקה את השדה
      router.back(); // חוזר לדף הקודם (רשימת המשימות)
    } catch (err) {
      Alert.alert("Error", "Failed to add task");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Save Task" onPress={handleSave} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});
