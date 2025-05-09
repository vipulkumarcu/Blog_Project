import React from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../Appwrite_Services/authService";
import { logout } from "../../Features/authSlice";
import { setMessage } from "../../Features/messageSlice";

function LogoutButton ()
{
  const dispatch = useDispatch ();

  const sessionId = useSelector ( ( state ) => state.auth.userData.sessionId );

  function logoutHandler ()
  {
    authService.userLogout ( false, sessionId )
      .then (
        ( boolean ) => {
          if ( boolean )
          {
            dispatch ( logout () );
            dispatch ( setMessage (
                {
                  type: "success",
                  message: "Logged out successfully.",
                  duration: 3000,
                }
              )
            );
          }

          else
          {
            dispatch ( setMessage (
                {
                  type: "error",
                  message: "Logout failed. Please try again.",
                  duration: 3000,
                }
              )
            );
          }
        }
      );
  }

  return (
    <button
      className = "inline-block px-6 py-2 text-xl text-white duration-200 shadow-md bg-red-800 transition-all hover:bg-red-600 rounded-full"
      onClick = { logoutHandler }
    >
      Logout
    </button>
  );
}

export default LogoutButton;