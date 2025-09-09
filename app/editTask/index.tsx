import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../../src/store/slices/taskSlice";
import { AppDispatch } from "../../src/store/store";

export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter task..."
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button
        title="Save"
        onPress={() => {
          if (text.trim()) {
            dispatch(addTaskAsync(text)); // שולח לשרת וגם שומר ב־Redux
            router.back();
          }
        }}
      />

    </View>
  );
}
