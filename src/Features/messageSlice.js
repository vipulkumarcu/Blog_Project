import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice (
  {
    name: "message",

    initialState: {
      display: false,
      type: null,
      message: null,
    },

    reducers: {
      setMessage: ( state, action ) => {
        state.display = true;
        state.type = action.payload.type;
        state.message = action.payload.message;
      },

      resetMessage: ( state ) => {
        state.display = false;
        state.type = null;
        state.message = null;
      }
    }
  }
);

export const { setMessage, resetMessage } = messageSlice.actions;

export default messageSlice.reducer;