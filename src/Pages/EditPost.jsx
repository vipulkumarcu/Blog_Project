import React from "react";
import { Container, PostForm } from "../Components/index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function EditPost ()
{
  const param = useParams ();

  const post = useSelector (
    ( state ) => state.post.posts.find (
      ( post ) => post.id === param.postId
    )
  );

  return (
    <div className = "py-8" >
      <Container>
        <PostForm post = { post } />
      </Container>
    </div>
  );
}

export default EditPost;