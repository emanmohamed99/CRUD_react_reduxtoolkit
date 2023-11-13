import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const insertuser = createAsyncThunk(
  "user/register",
  async (registerData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(
        "http://localhost:5001/register",
        registerData
      );
      console.log("test");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk(
  "user/register",
  async (loginData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(
        "http://localhost:5001/login",
        loginData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  user: {},
  token: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [insertuser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [insertuser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      console.log(action.payload);
    },
    [insertuser.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;

      console.log("pending");
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      console.log(action.payload);
    },
    [login.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload, "kk");
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
