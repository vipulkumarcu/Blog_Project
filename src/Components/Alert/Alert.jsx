import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../../Features/messageSlice";

function Alert ()
{
  const dispatch = useDispatch ();

  const { display, type, message, duration } = useSelector ( ( state ) => state.message );

  useEffect (
    () => {
      let timer;

      if ( display )
      {
        timer = setTimeout (
          () => {
            dispatch ( resetMessage () );
          }, duration
        );
      }

      return () => clearTimeout ( timer );
    }, [ display, dispatch, duration ]
  );

  if ( !display ) return null;

  const backgroundColor = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className = { `w-full ${ backgroundColor } text-white text-center p-3 text-2xl` } >
      { message }
    </div>
  );
}

export default Alert;