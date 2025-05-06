import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../Appwrite_Services/authService";
import { Button, InputBox, Logo } from "../index";
import { setMessage } from "../../Features/messageSlice";

function Signup ()
{
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const { register, handleSubmit } = useForm ();

  async function signupHandler ( data )
  {
    try
    {
      const response = await authService.userSignup ( data.email, data.password, data.name );

      if ( response )
      {
        dispatch ( setMessage ( "success", "Signup successful." ) );

        setTimeout (
          () => {
            dispatch ( setMessage ( "info", "You can now login into your account." ) );
          }, 4000
        );

        navigate ( "/login" );
      }
    }

    catch ( error )
    {
      dispatch ( setMessage ( "error", error.message ||"Signup failed." ) );
    }
  }

  return (
    <div className = "flex items-center justify-center w-full" >

      <div className = "mx-auto w-full max-w-lg bg-gray-300 rounded-xl p-10 border border-black/10" >

        <div className = "mb-2 flex justify-center" >
          <span className = "inline-block w-full max-w-[100px]" >
            <Logo />
          </span>
        </div>

        <h2 className = "text-center text-2xl font-bold leading-tight" >
          Create a new account
        </h2>

        <p className = "mt-2 text-center text-base text-black/60" >
          Already have an account ?&nbsp;
          <Link
              to = "/login"
              className = "font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>

        <form
          onSubmit = { handleSubmit ( signupHandler ) }
          className = "mt-8"
        >

          <div className = "space-y-5" >
            <InputBox
              label = "Full Name: "
              placeholder = "Enter your full name"
              {
                ...register ( "name" ,
                  {
                    required: true
                  }
                )
              }
            />
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
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  }
                )
              }
            />
            <Button
              type = "submit"
              className = "w-full rounded-lg"
            >
              Register Me
            </Button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Signup;