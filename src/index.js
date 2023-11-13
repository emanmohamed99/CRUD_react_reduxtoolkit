import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";

import Index from "./pages/Index";

import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./store";

const AddPost = React.lazy(() => import("./pages/Add"));
const EditPost = React.lazy(() => import("./pages/Edit"));
const DetailsPost = React.lazy(() => import("./pages/Details"));
const RegisterPage = React.lazy(() => import("./pages/Register"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const postParamHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "please make sure to insert correct post ID",
      status: 400,
    });
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      {
        path: "post/add",
        element: (
          <Suspense fallback="loading please wait...">
            <AddPost />
          </Suspense>
        ),
      },
      {
        path: "post/register",
        element: (
          <Suspense fallback="loading please wait...">
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "post/login",
        element: (
          <Suspense fallback="loading please wait...">
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "post/:id",
        element: (
          <Suspense fallback="loading please wait...">
            <DetailsPost />
          </Suspense>
        ),
        loader: postParamHandler,
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback="loading please wait...">
            <EditPost />
          </Suspense>
        ),
        loader: postParamHandler,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
