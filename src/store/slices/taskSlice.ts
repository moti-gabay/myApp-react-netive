import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// export const API_URL = "http://10.0.2.2:5000"; // אם אתה באמולטור Andro_id
export const API_URL = "http://localhost:5000"; // אם אתה על מחשב עם iOS Simulator

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
  console.log("res : " + res);
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
    });
    return res.json(); // השרת מחזיר את המשימה החדשה עם __id
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
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t._id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t._id !== action.payload);
    }
  },
  extraReducers: builder => {
    // טעינה
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      console.log( "print from redux :", action.payload)
      state.tasks = action.payload;
      state.loading = false;
    });

    // הוספה
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
  },
});

export const { updateTask, toggleTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
