import { createSlice } from "@reduxjs/toolkit";

const initialLoginStatus = localStorage.getItem ( "Login Status" ) === "true";

const initialUserData = localStorage.getItem ( "User Data" )
  ? JSON.parse ( localStorage.getItem ( "User Data" ) )
  : null;

const authSlice = createSlice (
  {
    name: "auth",

    initialState: {
      loginStatus: initialLoginStatus,
      userData: initialUserData,
      // userData: { sessionId , userId, email, name, isEmailVerified }
    },

    reducers: {
      login: ( state, action ) => {
        state.loginStatus = true;
        state.userData = action.payload;

        // Save to localStorage
        localStorage.setItem ( "Login Status", "true" );
        localStorage.setItem ( "User Data", JSON.stringify ( action.payload ) );
      },

      logout: ( state ) => {
        state.loginStatus = false;
        state.userData = null;

        // Clear localStorage
        localStorage.removeItem ( "Login Status" );
        localStorage.removeItem ( "User Data" );
      }
    }
  }
);

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;