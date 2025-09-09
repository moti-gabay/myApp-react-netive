import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { fetchTasks, Task, toggleTaskCompleted, deleteTaskAsync } from "../src/store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export default function TaskList() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const handleToggle = (task: Task) => {
    dispatch(toggleTaskCompleted({ id: task._id, completed: !task.completed }))
  }
  const handelDelete = (id: string) => {
    dispatch(deleteTaskAsync(id))
  }
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

    <View style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => handleToggle(item)} style={{ flex: 1 }}>
              <Text style={[styles.taskText, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handelDelete(item._id)}>
              <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
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
    alignItems: "center",
    width: "100%",          // תופס את כל רוחב המסך
    paddingVertical: 10,
    paddingHorizontal: 15,  // רווח מהקצוות
    borderBottomWidth: 1,
    borderColor: "#c3b0b0ff",
  },
  taskText: {
    fontSize: 16,
    flex: 1,                // תופס את כל השטח הפנוי לצד האייקון
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  delete: {
    color: "red",
    fontSize: 18,
    marginLeft: 10,         // רווח בין הטקסט לאייקון מחיקה
  },
});
