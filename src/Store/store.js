import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/authSlice";
import postSlice from "../Features/postSlice";

const store = configureStore (
  {
    reducer: {
      auth: authSlice,
      post: postSlice,
    }
  }
);

export default store;