import { configureStore } from "@reduxjs/toolkit";
import posts from "./postSlice";
import auth from "./authSlice";

export default configureStore({ reducer: { posts, auth } });
