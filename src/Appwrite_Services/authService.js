import { Client, Account, ID } from "appwrite";
import { environmentVariables } from "../Environment_Variables/environmentVariables";

const { appwriteEndpointUrl, appwriteProjectId } = environmentVariables;

class AuthService {
  client = new Client ();
  account;

  constructor ()
  {
    this.client.setEndpoint ( appwriteEndpointUrl ).setProject ( appwriteProjectId );
    this.account = new Account ( this.client );
  }

  async userSignup ( { email, password, name } )
  {
    try
    {
      const response = await this.account.create ( ID.unique (), email, password, name );

      if ( response )
      {
        return {
          status: "success",
          message: "User account created successfully.",
        }
      }

    }

    catch ( error )
    {
      throw new Error ( error.message || "Signup failed." );
    }
  }

  async userLogin ( { email, password } )
  {
    try
    {
      const response = await this.account.createEmailPasswordSession ( email, password );

      if ( response )
      {
        return {
          status: "success",
          message: "User login successful.",
        }
      }

    }

    catch ( error )
    {
      throw new Error ( error.message || "Login failed." );
    }
  }

  async userLogout ( { logOutFromAllDevices, sessionID } )
  {
    try
    {
      if ( logOutFromAllDevices )
      {
        const response = await this.account.deleteSessions ();

        if ( response )
        {
          return {
            status: "success",
            message: "You have been logged out of every device.",
          }
        }
      }

      else
      {
        const response = await this.account.deleteSession ( sessionID );

        if ( response )
        {
          return {
            status: "success",
            message: "You have been logged out successfully.",
          }
        }
      }
    }

    catch ( error )
    {
      throw new Error ( error.message || "Logout failed. Please try again." );
    }
  }

  async getUserStatus ()
  {
    try
    {
      const response = await this.account.get ();

      return !!response;
    }

    catch ( error )
    {
      console.error ( "Error getting user status:", error );
      return false;
    }
  }

}

const authService = new AuthService ();

export default authService;