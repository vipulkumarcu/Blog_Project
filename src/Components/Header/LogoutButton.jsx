import React from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../Appwrite_Services/authService";
import { logout } from "../../Features/authSlice";
import { setMessage } from "../../Features/messageSlice";

function LogoutButton ()
{
  const dispatch = useDispatch ();

  const sessionID = useSelector ( ( state ) => state.auth.userData.sessionID );

  function logoutHandler ()
  {
    authService.userLogout ( false, sessionID )
      .then (
        ( boolean ) => {
          if ( boolean )
          {
            dispatch ( logout () );
            dispatch ( setMessage (
                {
                  type: "success",
                  message: "Logged out successfully."
                }
              )
            );
          }

          else
          {
            dispatch ( setMessage (
                {
                  type: "error",
                  message: "Logout failed. Please try again."
                }
              )
            );
          }
        }
      );
  }

  return (
    <button
      className = "inline-block px-6 py-2 duration-200 hover: bg-blue-100 rounded-full"
      onClick = { logoutHandler }
    >
      Logout
    </button>
  );
}

export default LogoutButton;