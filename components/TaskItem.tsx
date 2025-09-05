import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Task } from "../src/store/slices/taskSlice";

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textDecorationLine: task.completed ? "line-through" : "none",
          flex: 1,
        }}
        onPress={onToggle}
      >
        {task.title}
      </Text>
      <Button title="Edit" onPress={onEdit} />
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
