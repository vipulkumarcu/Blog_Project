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
  const [ loading, setLoading ] = useState ( false );

  const dispatch = useDispatch ();

  function messageHandler ( type, message, duration )
  {
    dispatch ( setMessage ( { type, message, duration } ) );
  }

  // Fetching and dispatching posts
  async function loadPosts ()
  {
    try
    {
      const posts = await postService.getAllPosts ();

      if  (posts.length > 0 )
      {
        dispatch ( setPosts ( posts ) );

        messageHandler ( "success", "Posts fetched successfully.", 5000 );
      }

      else
      {
        messageHandler ( "error", "No posts found.", 5000 );
      }
    }

    catch ( error )
    {
      messageHandler ( "error", error.message || "Failed to fetch posts.", 5000 );
    }
  };

  // Authenticating user and initializing app state
  async function initializeApp ()
  {
    try {
      const userStatus = await authService.getUserStatus ();

      if ( !userStatus.status )
      {
        dispatch ( logout () );
        return;
      }

      const sessionId = await authService.getUserSession ();

      const userData = {
        ...userStatus.data,
        sessionId: sessionId || null,
      };

      dispatch ( login ( userData ) );

      await loadPosts (); // loading posts after login
    }

    catch ( error )
    {
      dispatch ( logout () );
      messageHandler ( "error", error.message || "Something went wrong during initialization.", 3000 );
    }

    finally
    {
      setLoading ( false );
    }
  };

  useEffect (
    () => {
      initializeApp();
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
          { loading ? <Loader /> : <Outlet /> }
        </main>

        <footer>
          <Footer />
        </footer>

      </div>

    </div>
  );
}

export default App;