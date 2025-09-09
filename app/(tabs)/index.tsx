import TaskItem from "@/components/TaskItem";
import { useAppDispatch } from "@/src/store/hooks";
import { checkAuth } from "@/src/store/slices/authSlice";
import { API_URL } from "@/src/store/url";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { deleteTaskAsync, fetchTasks, Task, toggleTaskCompleted } from "../../src/store/slices/taskSlice";
import { RootState } from "../../src/store/store";

export default function Home() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const hendelDelete = (id: string) => {
    dispatch(deleteTaskAsync(id))
    fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" }); // שולח בקשה לשרת
  }
  const handleToggel = (task: Task) => {
    dispatch(toggleTaskCompleted({ id: task._id, completed: !task.completed }))

  }

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(checkAuth());

  }, [dispatch]);


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => handleToggel(item)}
            onDelete={() => hendelDelete(item._id)}
            onEdit={() => router.push(`/editTask/${item._id}`)}
          />
        )}
      />
      <Button title="Add Task"   onPress={() => router.push("/task/addTask")} // נתיב יחסית למבנה הקבצים

       />
         </View>
  );
}
