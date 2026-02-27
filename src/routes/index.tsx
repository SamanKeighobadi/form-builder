import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import { Dashboard } from "@/pages/Dashboard";

import { FormEdit } from "@/pages/FormEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },

      { path: "forms/:id/edit", element: <FormEdit /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
