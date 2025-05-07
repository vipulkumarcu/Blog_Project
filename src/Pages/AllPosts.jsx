import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Card } from "../Components/index";

function AllPosts ()
{
  const posts = useSelector ( ( state ) => state.post.posts );

  const isLoggedIn = useSelector ( ( state) => state.auth.loginStatus );

  return (
    <div className = "w-full p-12 text-center bg-gray-400 rounded-xl shadow-lg" >

      <Container>
        {
          posts.length === 0
          ? (
              <div className = "flex flex-col items-center justify-center space-y-6 px-4" >
                {
                  isLoggedIn && (
                    <h1 className = "text-6xl font-bold text-gray-800 hover:text-gray-700 transition-all" >
                      No Posts Available
                    </h1>
                  )
                }

                {
                  isLoggedIn && (
                    <p className = "text-xl text-gray-700 max-w-2xl" >
                      You haven't created any posts yet. Start sharing your thoughts with the world!
                    </p>
                  )
                }

                {
                  isLoggedIn && (
                    <Link
                      to = "/add-post"
                      className = "inline-block px-6 py-2 text-xl text-white bg-amber-800 shadow-md hover:bg-amber-600 rounded-full transition duration-200"
                    >
                      Create Your First Post
                    </Link>
                  )
                }
              </div>
          )

          : (
            <div className = "w-full" >

              <div className = "w-full py-16 bg-gray-200 text-center" >

                <Container>

                  <div className = "max-w-3xl mx-auto space-y-6" >

                    <h1 className = "text-5xl font-bold text-gray-800 hover:text-gray-700 transition" >
                      Welcome to the Blog
                    </h1>

                    <p className = "text-lg text-gray-700" >
                      Dive into a world of ideas, stories, and insights shared by
                      our community.
                    </p>

                    <a
                      href="#posts"
                      className = "inline-block px-6 py-2 text-xl text-white bg-amber-800 hover:bg-amber-600 rounded-full transition duration-200"
                    >
                      Read Posts
                    </a>

                  </div>

                </Container>

              </div>

              <div id = "posts" className = "w-full py-8" >

                <Container>

                  <div className = "flex flex-wrap" >

                    {
                      posts.map (
                         (post ) => (
                          <div
                            key = { post.id }
                            className = "p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                          >
                            <Card { ...post } />
                          </div>
                        )
                      )
                    }

                  </div>

                </Container>

              </div>

            </div>
          )
        }
      </Container>

    </div>
  );
}

export default AllPosts;