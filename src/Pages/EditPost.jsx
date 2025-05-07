import React from "react";
import { Container, PostForm } from "../Components/index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function EditPost ()
{
  const { id } = useParams ();

  const post = useSelector ( ( state ) => state.post.posts.find ( ( post ) => post.id === id ) );

  if ( !post )
  {
    return (
      <div className = "w-full p-12 text-center bg-gray-400 rounded-xl shadow-lg" >
        <Container>
          <div className = "flex flex-col items-center justify-center space-y-6 px-4" >
            <h1 className = "text-6xl font-bold text-gray-800 hover:text-gray-700 transition-all" >
              Post not found.
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className = "py-8" >
      <Container>
        <PostForm post = { post } />
      </Container>
    </div>
  );
}

export default EditPost;