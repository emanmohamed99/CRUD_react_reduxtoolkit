import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { records: [], loading: false, error: null, record: null };
export const fetchPosts = createAsyncThunk(
  "posts/fetchposts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get("http://localhost:5001/posts");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const insertpost = createAsyncThunk(
  "book/insertpost",
  async (postsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(
        "http://localhost:5001/posts",
        postsData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`http://localhost:5001/posts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`http://localhost:5001/posts/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.patch(
        `http://localhost:5001/posts/${item.id}`,
        item
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    [fetchPosts.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
    [deletePost.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchPosts.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [insertpost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [insertpost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
    },
    [insertpost.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [fetchPost.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [editPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("edit", action.payload);
      state.record = action.payload;
    },
    [editPost.error]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { cleanRecord } = postSlice.actions;
export default postSlice.reducer;
