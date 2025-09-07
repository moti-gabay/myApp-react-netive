import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth:authReducer
  },
});

// types ל־dispatch ול־state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
