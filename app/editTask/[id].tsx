import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../src/store/slices/taskSlice";
import { AppDispatch, RootState } from "../../src/store/store";

export default function EditTask() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const task = useSelector((state: RootState) =>
        state.tasks.tasks.find((t) => t.id === id)
    );
    const [text, setText] = useState(task?.title || "");
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Edit task..."
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Button
                title="Save"
                onPress={() => {
                    if (task && text.trim()) {
                        dispatch(updateTask({
                            ...task,
                            title: text
                        }));
                        router.back();
                    }
                }}
            />
        </View>
    );
}
