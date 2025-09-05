import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../src/store/slices/taskSlice';
import { AppDispatch, RootState } from '../../src/store/store';

export default function EditTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [text, setText] = useState('');

  // שליפת המשימה הקיימת
  useEffect(() => {
    if (id) {
      const task = tasks.find(t => t.id === id);
      if (task) setText(task.title);
    }
  }, [id, tasks]);

  const handleSave = () => {
    if (id && text.trim()) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        dispatch(updateTask({ ...task, title: text })); // משמר את ה-completed
        router.back();
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Edit task"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
