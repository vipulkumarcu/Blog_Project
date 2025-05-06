import React from "react";
import { useSelector } from "react-redux";
import { Container, Card } from "../Components/index";

function AllPosts ()
{
  const posts = useSelector ( ( state ) => state.post.posts );

  return (
    <div className = "w-full py-8" >

      <Container>

        {
          posts.length === 0
          ? ( <p className = "text-center w-full text-4xl text-gray-700" > No posts available. </p> )
          : (
              <div className = "flex flex-wrap" >
                {
                  posts.map (
                    ( post ) => (
                      <div key = { post.$id } className = "p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" >
                          <Card { ...post } />
                      </div>
                    )
                  )
                }
              </div>
            )
        }

      </Container>

    </div>
  )
}

export default AllPosts;