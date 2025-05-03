import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header, Footer, Alert } from "./Components/index.js";
import authService from "./Appwrite_Services/authService.js";
import { login, logout } from "./Features/authSlice.js";
function App ()
{
  const [ loading, setloading ] = useState ( true );

  const dispatch = useDispatch ();

  useEffect (
    () => {
      authService.getUserStatus ()
        .then (
          ( data ) => {
            if ( data.status )
            {
              dispatch ( login ( data ) );
            }

            else
            {
              dispatch ( logout () );
            }
          }
        )
        .finally ( () =>  setloading ( false ) );
    }, []
  );

  return !loading
    ? (
      <div className = "min-h-screen flex flex-wrap content-between bg-gray-400" >

        <div className = "w-full block" >

          <header>
            <Alert />
            <Header />
          </header>

          <main>
            <Outlet />
          </main>

          <footer>
            <Footer />
          </footer>

        </div>

      </div>
    )
    : null
}

export default App;