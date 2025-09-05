import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../src/store/store';
import { toggleTask, deleteTask } from '../../src/store/slices/taskSlice';
import TaskItem from '../../components/TaskItem';
import { useRouter } from 'expo-router';

export default function Home() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => dispatch(toggleTask(item.id))}
            onDelete={() => dispatch(deleteTask(item.id))}
            onEdit={() => router.push(`/editTask?id=${item.id}`)}
          />
        )}
      />
      <Button title="Add Task" onPress={() => router.push('/editTask')} />
    </View>
  );
}
