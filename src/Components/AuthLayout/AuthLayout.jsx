import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../index";

function AuthLayout ( { children, authentication } )
{
  const navigate = useNavigate ();

  const authStatus = useSelector ( ( state ) => state.auth.loginStatus );

  const [ loader, setLoader ] = useState ( true );

  useEffect (
    () => {
      if ( authentication && authStatus !== authentication )
      {
        navigate ( "/login" );
      }

      else if ( !authentication && authStatus !== authentication )
      {
        navigate ( "/" );
      }

      setLoader ( false );
    }, [ authStatus, navigate, authentication ]
  );

  return (
    loader ? <Loader /> : <div> { children } </div>
  );
}

export default AuthLayout;