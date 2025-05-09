import React from "react";
import { Container, Logo, LogoutButton } from "../index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header ()
{
  const loginStatus = useSelector ( ( state ) => state.auth.loginStatus );

  const navigate = useNavigate ();

  const navItems = [
    {
      name: 'Home',
      path: "/",
      active: true
    },
    {
      name: "Login",
      path: "/login",
      active: !loginStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !loginStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: loginStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: loginStatus,
    },
  ]

  return (
    <div className = "py-3 shadow bg-gray-500" >

      <Container>

        <nav className = "flex" >

          <div className = "mr-4" >
            <Link to="/">
              <Logo className = "shadow-3xl hover:cursor-pointer hover:mt-3 duration-200 transition-all" width = "50px" />
            </Link>
          </div>

          <ul className = "flex ml-auto">
            {
              navItems.map (
                ( item ) => (
                  item.active ?
                  (
                    <li key = { item.name }>
                      <button
                        onClick = { () => navigate ( item.path ) }
                        className = "inline-block px-6 py-2 duration-300 mr-2 hover:bg-blue-300 hover:cursor-pointer hover:shadow-md rounded-full text-xl"
                      >
                        { item.name }
                      </button>
                    </li>
                  ) : null
                )
              )
            }

            {
              loginStatus && (
                <li>
                  <LogoutButton />
                </li>
              )
            }
          </ul>

        </nav>

      </Container>

    </div>
  );
}

export default Header;