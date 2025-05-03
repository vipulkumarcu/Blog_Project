import { Client, Databases, Query  } from "appwrite";
import environmentVariables from "../Environment_Variables/environmentVariables";

const { appwriteEndpointUrl, appwriteProjectId, appwriteDatabaseId, appwriteCollectionId } = environmentVariables;

class PostService
{
  client = new Client ();
  databases;
  constructor ()
  {
    this.client.setEndpoint ( appwriteEndpointUrl ).setProject ( appwriteProjectId );
    this.databases = new Databases ( this.client );
  }

  async createPost ( title, content, slug, featuredImage, status, userId )
  {
    try
    {
      const response = await this.databases.createDocument (
        appwriteDatabaseId,
        appwriteCollectionId,
        { title, content, slug, featuredImage, status, userId }
      );

      return {
        status: true,
        data: {
          id: response?.$id,
        }
      };
    }

    catch ( error )
    {
      console.log ( error.message || "Post creation failed." );
      return {
        status: false,
      };
    }
  }

  async updatePost ( slug, title, content, featuredImage, status )
  {
    try
    {
      await this.databases.updateDocument (
        appwriteDatabaseId,
        appwriteCollectionId,
        slug,
        { title, content, slug, featuredImage, status }
      );

      return true;
    }

    catch ( error )
    {
      console.log ( error.message || "Post update failed." );
      return false;
    }
  }

  async getSinglePost ( slug )
  {
    try
    {
      await this.databases.getDocument (
        appwriteDatabaseId,
        appwriteCollectionId,
        slug
      );

      return true;
    }

    catch ( error )
    {
      console.log ( error.message || "Post fetch failed." );
      return false;
    }
  }

  async getAllPosts ()
  {
    try
    {
      const response = await this.databases.listDocuments (
        appwriteDatabaseId,
        appwriteCollectionId,
        [
          Query.equal ( "status", "active")
        ]
      );

      return response?.documents || [];

    }

    catch ( error )
    {
      console.log ( error.message || "Failed to fetch posts." );
      return [];
    }
  }

  async deletePost ( slug )
  {
    try
    {
      await this.databases.deleteDocument (
        appwriteDatabaseId,
        appwriteCollectionId,
        slug
      );

      return true;
    }

    catch ( error )
    {
      console.log ( error.message || "Failed to delete post" );
    }
  }
}

const postService = new PostService ();

export default postService;