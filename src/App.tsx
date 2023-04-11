import { useEffect, useState } from "react";
import Form from "./Form";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthWrapper from "./context/AuthWrapper";
import UserResult from "./UserResult";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="border border-black min-h-screen">
          <Form />
        </div>
      ),
    },
    {
      path: "/user",
      element: (
        <AuthWrapper>
          <UserResult />
        </AuthWrapper>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
