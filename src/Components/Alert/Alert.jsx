import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../../Features/messageSlice";

function Alert ()
{
  const dispatch = useDispatch ();

  const { display, type, message } = useSelector ( ( state ) => state.message );

  useEffect (
    () => {
      let timer;

      if ( display )
      {
        timer = setTimeout (
          () => {
            dispatch ( resetMessage () );
          }, 3000
        );
      }

      return () => {
        clearTimeout ( timer );
      };
    }, [ display, dispatch ]
  );

  if ( !display ) return null;

  let messageType = "";

  switch ( type )
  {
    case "success":
      messageType = "bg-green-600";
      break;

    case "error":
      messageType = "bg-red-600";
      break;

    case "warning":
      messageType = "bg-yellow-600";
      break;

    case "info":
      messageType = "bg-blue-600";
      break;

    default:
      messageType = "bg-gray-600";
      break;
  }

  return (
    <div className = { `w-full ${ messageType } text-white text-center p-3 text-2xl`} >
      { message }
    </div>
  );
}

export default Alert;