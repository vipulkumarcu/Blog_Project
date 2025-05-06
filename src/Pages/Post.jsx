import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import postService from "../Appwrite_Services/postService";
import storageService from "../Appwrite_Services/storageService";
import { Button, Container } from "../Components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { setMessage } from "../Features/messageSlice";
import { deletePost } from "../Features/postSlice";

function Post ()
{
  const { id } = useParams ();
  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  const userData = useSelector ( ( state ) => state.auth.userData );
  const post = useSelector ( ( state ) => state.post.posts.find ( ( post ) => post.id === id ) );

  if ( !post )
  {
    return (
      <Container>
        <div className = "text-center py-8 text-gray-600" > Post not found. </div>
      </Container>
    );
  }

  const fileUrl = storageService.getFilePreview ( post.featuredImage );
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  async function deletePostHandler ()
  {
    const confirm = window.confirm ( "Are you sure you want to delete this post?" );
    if ( !confirm ) return;

    try {
      const deleted = await postService.deletePost ( post.$id );

      if ( deleted )
      {
        dispatch ( deletePost ( post.$id ) );
        dispatch ( setMessage ( "success", "Post deleted successfully." ) );
        navigate ( "/all-posts" );
      }
    }

    catch ( error )
    {
      dispatch ( setMessage ( "error", error.message || "Failed to delete post." ) );
    }
  }


  return (
    <div className = "py-8" >

      <Container>

        <div className = "w-full flex justify-center mb-4 relative border rounded-xl p-2" >
          <img
            src = { fileUrl }
            alt = { post.title }
            className = "rounded-xl"
          />

          {
            isAuthor && (
              <div className = "absolute right-6 top-6" >

                <Link to = { `/edit-post/${ post.$id }` } >
                  <Button bgColor = "bg-green-500" className = "mr-3" >
                    Edit
                  </Button>
                </Link>

                <Button bgColor = "bg-red-500" onClick = { deletePostHandler  } >
                  Delete
                </Button>

              </div>
            )
          }
        </div>

        <div className = "w-full mb-6" >
          <h1 className = "text-2xl font-bold" > { post.title } </h1>
        </div>

        <div className = "browser-css" >
          {
            parse ( post.content )
          }
        </div>

      </Container>

    </div>
  );
}

export default Post;