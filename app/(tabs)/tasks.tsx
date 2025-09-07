import TaskList from "@/components/TaskList";
import React from "react";
import { View, Text } from "react-native";

export default function Tasks() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TaskList/>
    </View>
  );
}
