import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/authSlice";
import postSlice from "../Features/postSlice";
import messageSlice from "../Features/messageSlice";

const store = configureStore (
  {
    reducer: {
      auth: authSlice,
      post: postSlice,
      message: messageSlice,
    }
  }
);

export default store;