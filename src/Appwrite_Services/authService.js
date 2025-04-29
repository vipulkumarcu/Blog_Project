import { Client, Account, ID } from "appwrite";
import environmentVariables from "../Environment_Variables/environmentVariables";

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
        return true;
      }
    }

    catch ( error )
    {
      console.log ( error.message || "Signup failed." );
      return {
        status: false
      };
    }
  }

  async userLogin ( { email, password } )
  {
    try
    {
      const session = await this.account.createEmailPasswordSession ( email, password );

      return {
        status: true,
        data: {
          sessionId: session?.$id,
          userId: session?.userId
        }
      };

    }

    catch ( error )
    {
      console.log ( error.message || "Signup failed." );
      return {
        status: false
      };
    }
  }

  async userLogout ( { logOutFromAllDevices, sessionID } )
  {
    try
    {
      if ( logOutFromAllDevices )
      {
        await this.account.deleteSessions ();
      }

      else
      {
        await this.account.deleteSession ( sessionID );
      }

      return true;
    }

    catch ( error )
    {
      console.log ( error.message || "Logout failed. Please try again." );
      return false;
    }
  }

  async getUserStatus ()
  {
    try
    {
      const response = await this.account.get ();

      return {
        status: true,
        data: {
          userId: response?.$id,
          email: response?.email,
          name: response?.name,
          isEmailVerified: response?.emailVerification,
        }
      };
    }

    catch ( error )
    {
      console.log ( error.message || "Error getting user status." );
      return {
        status: false
      };
    }
  }

}

const authService = new AuthService ();

export default authService;