import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header, Footer, Alert, Loader } from "./Components/index.js";
import authService from "./Appwrite_Services/authService.js";
import postService from "./Appwrite_Services/postService.js";
import { login, logout } from "./Features/authSlice.js";
import { setPosts } from "./Features/postSlice.js";
import { setMessage } from "./Features/messageSlice.js";
function App ()
{
  const [ loading, setloading ] = useState ( false );

  const dispatch = useDispatch ();

  function messageHandler ( type, message )
  {
    dispatch ( setMessage ( type, message ) );
  }

  useEffect (
    () => {
      async function init ()
      {
        try
        {
          const userStatus  = await authService.getUserStatus ();

          if ( userStatus.status )
          {
            const storedUserData  = JSON.parse ( localStorage.getItem ( "User Data" ) );

            const mergedUserData = {
              ...userStatus.data,
              sessionId: storedUserData?.sessionId || null,
            };

            dispatch ( login ( mergedUserData ) );

            const posts = await postService.getAllPosts ();

            if ( posts.length > 0 )
            {
              dispatch ( setPosts ( posts ) );
              messageHandler ( "success", "Posts fetched successfully." );
            }

            else
            {
              messageHandler ( "error", "No posts found." );
            }
          }

          else
           {
            dispatch ( logout () );
          }
        }

        catch ( error )
        {
          console.error ( "Initialization failed", error );
          dispatch ( logout () );
          messageHandler ( "error", "Something went wrong during initialization." );
        }

        finally
        {
          setloading ( false );
        }
      }

      init ();
    }, []
  );

  return  (
    <div className = "min-h-screen flex flex-wrap content-between bg-gray-400" >

      <div className = "w-full block" >

        <header>
          <Alert />
          <Header />
        </header>

        <main>
          { loading && <Loader /> }
          { !loading && <Outlet /> }
        </main>

        <footer>
          <Footer />
        </footer>

      </div>

    </div>
  );
}

export default App;