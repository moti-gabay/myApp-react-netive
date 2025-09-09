import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_URL } from '../url';

// export const API_URL = "http://10.0.2.2:5000"; // אם אתה באמולטור Andro_id
// export const API_URL = "http://localhost:5000"; // אם אתה על מחשב עם iOS Simulator

export interface Task {
  _id: string;   // שים לב: Mongo מחזיר __id
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

// ---- קריאה לשרת ----
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await fetch(API_URL + "/tasks");
  console.log("res : " + res.toString());
  return res.json();
});

// ---- הוספת משימה לשרת ----
export const addTaskAsync = createAsyncThunk(
  "tasks/add",
  async (title: string) => {
    const res = await fetch(API_URL + "/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
      credentials: "include"

    });
    return res.json(); // השרת מחזיר את המשימה החדשה עם __id
  }
);
// עדכון משימה
export const updateTaskAsync = createAsyncThunk(
  "tasks/update",
  async ({ id, title, completed }: { id: string; title: string; completed: boolean }) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed }),
      credentials: "include"

    });
    return res.json();
  }
);
export const toggleTaskCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async ({ id, completed }: { id: string; completed: boolean }) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
      credentials: "include"
    });
    return res.json();
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    const res = await fetch(API_URL + "/tasks/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ title }),
      credentials: "include"

    });
    return res.json();
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    }
  },
  extraReducers: builder => {
    // טעינה
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });

    // הוספה
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });

    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = {
          _id: action.payload._id,
          title: action.payload.title,
          completed: action.payload.completed,
        };
      }
    });
    builder.addCase(toggleTaskCompleted.fulfilled, (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });
    builder.addCase(deleteTaskAsync.fulfilled,(state,action) => {
      state.tasks = state.tasks.filter(t => t._id !== action.payload); 
   })
  },
});

export const { updateTask } = taskSlice.actions;
export default taskSlice.reducer;
