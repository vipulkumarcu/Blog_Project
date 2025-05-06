import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from "./Store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import AllPosts from "./Pages/AllPosts.jsx";
import AddPost from "./Pages/AddPost.jsx";
import EditPost from "./Pages/EditPost.jsx";
import Post from "./Pages/Post.jsx";
import AuthLayout from "./Components/AuthLayout/AuthLayout.jsx";

const router = createBrowserRouter (
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <AuthLayout authentication = { false } >
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "/signup",
          element: (
            <AuthLayout authentication = { false } >
              <Signup />
            </AuthLayout>
          ),
        },
        {
          path: "/all-posts",
          element: (
            <AuthLayout authentication = { true } >
              {" "}
              <AllPosts />
            </AuthLayout>
          ),
        },
        {
          path: "/add-post",
          element: (
            <AuthLayout authentication = { true } >
              {" "}
              <AddPost />
            </AuthLayout>
          ),
        },
        {
          path: "/edit-post/:id",
          element: (
            <AuthLayout authentication = { true } >
              {" "}
              <EditPost />
            </AuthLayout>
          ),
        },
        {
          path: "/post/:id",
          element: <Post />,
        },
      ],
    },
  ]
);

createRoot ( document.getElementById ( 'root' ) )
.render (
  <StrictMode>
    <Provider store = { store } >
      <RouterProvider router = { router } />
    </Provider>
  </StrictMode>,
);