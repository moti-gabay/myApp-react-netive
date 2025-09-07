import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { fetchTasks, toggleTask, deleteTask } from "../src/store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export default function TaskList() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);

  // טוען משימות מהשרת
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <Text>טוען משימות...</Text>
//       </View>
//     );
//   }

  if (!tasks.length) {
    return (
      <View style={styles.center}>
        <Text>אין משימות</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item._id} // Mongo מחזיר _id
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <TouchableOpacity onPress={() => dispatch(toggleTask(item._id))}>
            <Text style={[styles.taskText, item.completed && styles.completed]}>
              {item.title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(deleteTask(item._id))}>
            <Text style={styles.delete}>🗑</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  delete: {
    color: "red",
    fontSize: 18,
  },
});
