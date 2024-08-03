import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MainPage } from './MainPage'
import { Register } from './Register';
import { EditBooks } from "./EditBooks";
import "./index.css";
import { Login } from "./Login";
import { EditUsers } from "./EditUsers";

let router = ""

if(localStorage.getItem('id')) {
  router = createBrowserRouter([
    {
      path: "/home",
      element: <MainPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/edit-books",
      element: <EditBooks/>
    },
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/edit-users",
      element: <EditUsers/>
    }
  ]);
} else {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    }
  ]);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
