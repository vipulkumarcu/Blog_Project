import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice (
  {
    name: "post",

    initialState: {
      posts: [],
    },

    reducers: {
      setPosts: (state, action) => {
        state.posts = action.payload;
      },

      addPost: ( state, action ) => {
        state.posts.push ( action.payload );
      },

      updatePost: ( state, action ) => {
        state.posts = state.posts.map (
          ( post ) => post.id === action.payload.id ? action.payload : post
        );
      },

      deletePost: ( state, action ) => {
        state.posts = state.posts.filter (
          ( post ) => post.id !== action.payload
        );
      }
    }
  }
);

export const { setPosts, addPost, updatePost, getOnePost, deletePost } = postSlice.actions;

export default postSlice.reducer;