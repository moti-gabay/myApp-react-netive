import React, { useEffect } from "react";
import { View, FlatList, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import TaskItem from "@/components/TaskItem";
import { fetchTasks, toggleTaskCompleted, deleteTaskAsync, Task } from "@/src/store/slices/taskSlice";
import { useRouter } from "expo-router";
import { RootState } from "@/src/store/store";
import { API_URL } from "@/src/store/url";

export default function Home() {
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggle = (task: Task) => {
    dispatch(toggleTaskCompleted({ id: task._id, completed: !task.completed }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTaskAsync(id));
    fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => handleToggle(item)}
            onDelete={() => handleDelete(item._id)}
            onEdit={() => router.push(`/editTask/${item._id}`)}
          />
        )}
      />
      <Button title="Add Task" onPress={() => router.push("/task/addTask")} />
    </View>
  );
}
