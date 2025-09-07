import TaskItem from "@/components/TaskItem";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks, toggleTask } from "../../src/store/slices/taskSlice";
import { AppDispatch, RootState } from "../../src/store/store";
import TaskList from "@/components/TaskList";

export default function Home() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => dispatch(toggleTask(item._id))}
            onDelete={() => dispatch(deleteTask(item._id))}
            onEdit={() => router.push(`/editTask/${item._id}`)}
          />
        )}
      />
      <Button title="Add Task" onPress={() => router.push("/editTask")
      } /> */}
     <TaskList/>
    </View>
  );
}
