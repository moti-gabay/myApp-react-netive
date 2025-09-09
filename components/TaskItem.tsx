import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
      <TouchableOpacity onPress={onToggle} style={{ flex: 1 }}>
        <Text style={[styles.text, task.completed && styles.completed]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <Button title="Edit" onPress={onEdit} />
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#c3b0b0ff",
  },
  text: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
