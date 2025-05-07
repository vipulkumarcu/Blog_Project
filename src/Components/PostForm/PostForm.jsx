import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { InputBox, Button, RTE, SelectBox } from "../index";
import storageService from "../../Appwrite_Services/storageService";
import postService from "../../Appwrite_Services/postService";
import { addPost, updatePost } from "../../Features/postSlice";
import { setMessage } from "../../Features/messageSlice";

function PostForm ( {  post } )
{
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm (
    {
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    }
  );

  const navigate = useNavigate ();

  const dispatch = useDispatch ();

  const userData = useSelector ( ( state ) => state.auth.userData );

  async function postFormHandler ( data )
  {
    try
    {
      // ----------------
      // UPDATE MODE
      // ----------------
      if ( post )
      {
        let uploadedImage = null;

        if ( data.image?.[0] )
        {
          const { status: uploadStatus, fileData } = await storageService.createFile ( data.image[0] );
          if ( uploadStatus )
          {
            uploadedImage = fileData;
            await storageService.deleteFile ( post.featuredImage );
          }
        }

        const isPostUpdated = await postService.updatePost (
          post.$id,
          {
            ...data,
            featuredImage: uploadedImage?.$id || post.featuredImage,
          }
        );

        if ( isPostUpdated ) {
          dispatch (
            updatePost (
              {
                ...data,
                $id: post.$id,
                featuredImage: uploadedImage?.$id || post.featuredImage,
              }
            )
          );

          dispatch ( setMessage (
              {
                type: "success",
                message: "Post updated successfully."
              }
            )
          );
          navigate ( "/all-posts" );
        }
      }

      // ----------------
      // CREATE MODE
      // ----------------
      else
      {
        const { status: uploadStatus, fileData: uploadedImage } = await storageService.createFile ( data.image[0] );

        if ( uploadStatus )
        {
          data.featuredImage = uploadedImage?.$id;

          const { status: createStatus, post: createdPost } = await postService.createPost (
            data.title,
            data.content,
            data.slug,
            data.featuredImage,
            data.status,
            userData.userId
          );

          if ( createStatus )
          {
            dispatch (
              addPost (
                {
                  title: data.title,
                  content: data.content,
                  slug: data.slug,
                  featuredImage: data.featuredImage,
                  status: data.status,
                  id: createdPost?.$id,
                }
              )
            );

            dispatch ( setMessage (
                {
                  type: "success",
                  message: "Post created successfully."
                }
              )
            );
            navigate ( "/all-posts" );
          }
        }
      }
    }

    catch ( error )
    {
      dispatch ( setMessage (
          {
            type: "error",
            message: error.message || "Something went wrong. Try again."
          }
        )
      );
    }
  }

  const slugTransform = useCallback (
    ( value ) => {
      if ( value && typeof value === "string" )
      {
        return value
          .trim ()
          .toLowerCase ()
          .replace ( /[^a-zA-Z\d\s]+/g, "-" )
          .replace ( /\s/g, "-" );
      }

      return "";

    }, []
  );

  useEffect (
    () => {
      const subscription = watch (
        ( value, { name } ) => {
          if ( name === "title" )
          {
            setValue ( "slug", slugTransform ( value.title ), { shouldValidate: true } );
          }
        }
      );

      return () => subscription.unsubscribe ();

    }, [ watch, slugTransform, setValue ]
  );

  return (
    <form onSubmit = { handleSubmit ( postFormHandler ) } className = "flex flex-wrap" >

      <div className = "w-2/3 px-2" >

        <InputBox
          label = "Title :"
          placeholder = "Title"
          className = "mb-4"
          { ...register ( "title", { required: true } ) }
        />

        <InputBox
          label = "Slug :"
          placeholder = "Slug"
          className = "mb-4"
          { ...register ( "slug", { required: true } ) }
          onInputBox = {
            ( e ) => {
              setValue ( "slug",
                slugTransform ( e.currentTarget.value ),
                { shouldValidate: true, }
              );
            }
          }
        />

        <RTE
          label = "Content :"
          name="content"
          control = { control }
          defaultValue = { getValues ( "content" ) }
        />

      </div>

      <div className = "w-1/3 px-2" >

        <InputBox
          label = "Featured Image :"
          type = "file"
          className = "mb-4"
          accept = "image/png, image/jpg, image/jpeg, image/gif"
          { ...register ( "image", { required: !post } ) }
        />

        { post &&
          (
            <div className = "w-full mb-4" >
              <img
                src = { storageService.getFilePreview ( post.featuredImage ) }
                alt = { post.title }
                className = "rounded-lg"
              />
            </div>
          )
        }

        <SelectBox
          options = { [ "active", "inactive" ] }
          label = "Status"
          className = "mb-4"
          { ...register ( "status", { required: true } ) }
        />

        <Button
          type = "submit"
          bgColor = { post ? "bg-green-500" : undefined }
          className = "w-full"
        >
          { post ? "Update" : "Submit" }
        </Button>

      </div>

    </form>
  );
}

export default PostForm;