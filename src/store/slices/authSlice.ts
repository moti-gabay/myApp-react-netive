import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../url";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    console.log(res.json())
    return res.json();
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // שולח cookie
    });
        console.log(res.json())

    return res.json();
  }
);

// ✅ יציאה עם בקשה לשרת
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include", // חובה כדי לנקות cookie
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return true;
});

export const checkAuth = createAsyncThunk("auth/check", async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include", // שולח cookies
  });
  return res.json();
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token || null;
      state.error = action.payload.error || null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.error = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
  if (action.payload.user) {
    state.token = "valid"; // אפשר גם לשמור את כל פרטי המשתמש
    state.error = null;
  } else {
    state.token = null;
  }
});

  },
});

export default authSlice.reducer;
