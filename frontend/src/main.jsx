import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import Landing from "./routes/landing/Landing.jsx";
import Login from "./routes/login/Login.jsx";
import Register from "./routes/register/Register.jsx";
import Logout from "./routes/logout/Logout.jsx";
import HomePage from "./routes/homepage/HomePage.jsx";

import { AuthContextProvider, useAuth } from "./context/AuthContext.jsx";
import Services from "./routes/services/Services.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";

function RouterConfig() {
  const { user } = useAuth();

  const LoginScreen = {
    user: <HomePage />,
    "care-taker": <Dashboard />,
    default: <Landing />,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: LoginScreen[user?.role] || LoginScreen["default"],
        },
        {
          path: "login",
          element: user ? <Navigate to={"/"} /> : <Login />,
        },
        {
          path: "register/:type",
          element: user ? <Navigate to={"/"} /> : <Register />,
        },
        {
          path: "logout",
          element: user ? <Logout /> : <Navigate to={"/"} />,
        },
        {
          path: "/services",
          element: user ? <Services /> : <Navigate to={"/login"} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterConfig />
    </AuthContextProvider>
  </React.StrictMode>
);
