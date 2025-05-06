import React from "react";
import { Container } from "../index";
import { Link } from "react-router-dom";

function EmptyState ( { isLoggedIn } )
{
  return (
    <div className = "w-full py-16 text-center bg-gray-400 rounded-xl shadow-lg" >

      <Container>

        <div className = "flex flex-col items-center justify-center space-y-6 px-4" >

          <h1 className = "text-6xl font-bold text-gray-800 hover:text-gray-700 transition-all" >
          {
            isLoggedIn ? "No Posts Available" : "Welcome to DevBlog"
          }
          </h1>

          <p className = "text-xl text-gray-700 max-w-2xl" >
            {
              isLoggedIn
                ? "You haven't created any posts yet. Start sharing your thoughts with the world!"
                : "Discover insightful posts and share your own stories. Login to explore more."
            }
          </p>

          <div>
            {
              isLoggedIn
              ? (
                <Link
                  to = "/add-post"
                  className = "inline-block px-6 py-2 text-xl text-white bg-amber-800 shadow-md hover:bg-amber-600 rounded-full transition duration-200"
                >
                  Create Your First Post
                </Link>
              )
              : (
                <Link
                  to = "/login"
                  className = "inline-block px-6 py-2 text-xl text-white bg-amber-800 shadow-md hover:bg-amber-600 rounded-full transition duration-200"
                >
                  Login to Get Started
                </Link>
              )
            }
          </div>

        </div>

      </Container>

    </div>
  );
}

export default EmptyState;