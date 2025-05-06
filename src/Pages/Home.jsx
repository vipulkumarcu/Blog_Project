import React from "react";
import { useSelector } from "react-redux";
import { Container, Card, EmptyState } from "../Components/index";
import { Link } from "react-router-dom";

function Home ()
{
  const posts = useSelector ( ( state ) => state.post.posts );

  const isLoggedIn = useSelector ( ( state) => state.auth.loginStatus );

  if ( posts.length === 0 )
  {
    return <EmptyState isLoggedIn = { isLoggedIn } />
  }

  return (
    <div className = "w-full py-12 bg-gray-100" >

      <Container>

        <div className = "flex flex-col items-center justify-center text-center space-y-6 px-4" >

          <h1 className = "text-6xl font-bold text-gray-800 hover:text-gray-700 transition-all" >
            Welcome to My Blog
          </h1>

          <p className = "text-xl text-gray-700 max-w-2xl" >
            Discover stories, ideas, and thoughts from our global community.
            Whether you're a reader or a writer, this is your place to connect
            and create.
          </p>

          <Link
            to = "/all-posts"
            className = "inline-block px-6 py-2 text-xl text-white bg-amber-800 shadow-md hover:bg-amber-600 rounded-full transition duration-200"
          >
            Explore Posts
          </Link>

        </div>

      </Container>

    </div>
  );
}

export default Home;