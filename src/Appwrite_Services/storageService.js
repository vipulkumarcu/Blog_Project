import { Client, Storage , ID  } from "appwrite";
import environmentVariables from "../Environment_Variables/environmentVariables";

const { appwriteEndpointUrl, appwriteProjectId, appwriteBucketId } = environmentVariables;

class StorageService
{
  client = new Client ();
  storage;

  constructor ()
  {
    this.client.setEndpoint ( appwriteEndpointUrl ).setProject ( appwriteProjectId );
    this.storage = new Storage ( this.client );
  }

  async createFile ( file )
  {
    try
    {
      const response = await this.storage.createFile ( appwriteBucketId , ID.unique () , file );

      return {
        status: true,
        fileData: {
          fileId: response?.$id,
          name: response?.name,
        },
      };
    }

    catch ( error )
    {
      console.log ( error.message || "Failed to upload File." );
      return {
        status: false,
        fileData: null,
      }
    }
  }

  async deleteFile ( fileId )
  {
    try
    {
      await this.storage.deleteFile ( appwriteBucketId, fileId );
      return true;
    }

    catch ( error )
    {
      console.log ( error.message || "Failed to delete File." );
      return false;
    }
  }

  async getFilePreview ( fileId )
  {
    try
    {
      const previewUrl = this.storage.getFilePreview ( appwriteBucketId, fileId ).href;
      return previewUrl;
    }

    catch ( error )
    {
      console.log ( error.message || "Failed to get file preview." );
      return null;
    }
  }
}

const storageService = new StorageService ();

export default storageService;