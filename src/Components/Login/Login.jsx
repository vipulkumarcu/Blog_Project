import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../Appwrite_Services/authService";
import { login } from "../../Features/authSlice";
import { Button, InputBox, Logo } from "../index";
import { setMessage } from "../../Features/messageSlice";

function Login ()
{
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const { register, handleSubmit } = useForm ();

  async function loginHandler ( data )
  {
    try
    {
      const sessionResponse = await authService.userLogin ( data.email, data.password );

      if ( sessionResponse.status )
      {
        const userStatus = await authService.getUserStatus ();

        if ( userStatus.status )
        {
          const combinedUserData = {
            ...sessionResponse.data,
            ...userStatus.data
          };

          dispatch ( login ( combinedUserData ) );
          dispatch ( setMessage ( "success", "Logged in successfully." ) );
          navigate ( "/" );
        }
      }

      else
      {
        dispatch ( setMessage ( "error", "Login failed." ) );
      }
    }

    catch ( error )
    {
      dispatch ( setMessage ( "error", error.message ||"Login failed." ) );
    }
  }

  return (
    <div className = "flex items-center justify-center w-full" >

      <div className = "mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10" >

        <div className = "mb-2 flex justify-center" >
          <span className = "inline-block w-full max-w-[100px]" >
            <Logo />
          </span>
        </div>

        <h2 className = "text-center text-2xl font-bold leading-tight" >
          Sign in to your account
        </h2>

        <p className = "mt-2 text-center text-base text-black/60" >
          Don&apos;t have any account?&nbsp;
          <Link
              to = "/signup"
              className = "font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form
          onSubmit = { handleSubmit ( loginHandler ) }
          className = "mt-8"
        >

          <div className = "space-y-5" >
            <InputBox
              label = "Email: "
              type = "email"
              placeholder = "Enter your email"
              {
                ...register ( "email" ,
                  {
                    required: true,
                    validate: {
                      matchPattern: ( value ) => {
                        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test ( value ) || "Invalid email address";
                      }
                    }
                  }
                )
              }
            />
            <InputBox
              label = "Password: "
              type = "password"
              placeholder = "Enter your password"
              {
                ...register ( "password" ,
                  {
                    required: true
                  }
                )
              }
            />
            <Button
              type = "submit"
              className = "w-full"
            >
              Sign in
            </Button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;