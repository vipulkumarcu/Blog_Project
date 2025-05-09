import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice (
  {
    name: "message",

    initialState: {
      display: false,
      type: null,
      message: null,
      duration: null,
    },

    reducers: {
      setMessage: ( state, action ) => {
        const { type, message, duration } = action.payload;
        state.display = true;
        state.type = type;
        state.message = message;
        state.duration = duration;
      },

      resetMessage: ( state ) => {
        state.display = false;
        state.type = null;
        state.message = null;
        state.duration = null;
      }
    }
  }
);

export const { setMessage, resetMessage } = messageSlice.actions;

export default messageSlice.reducer;