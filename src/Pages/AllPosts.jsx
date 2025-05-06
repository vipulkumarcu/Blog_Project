import React from "react";
import { useSelector } from "react-redux";
import { Container, Card } from "../Components/index";

function AllPosts ()
{
  const posts = useSelector ( ( state ) => state.post.posts );

  return (
    <div className = "w-full py-8" >

      <Container>

        <div className = "flex flex-wrap" >

          {
            posts.map (
              ( post ) => (
                <div key = { post.id } className = "p-2 w-1/4" >
                    <Card { ...post } />
                </div>
              )
            )
          }

        </div>

      </Container>

    </div>
  )
}

export default AllPosts;