import App from "../layout/App";
import { createBrowserRouter, Navigate } from "react-router";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "activities",
        element: <ActivityDashboard />, // Placeholder for activities page
      },
      {
        path: "activities/:id",
        element: <ActivityDetailPage />, // Placeholder for activity details page
      },
      {
        path: "createActivity",
        element: <ActivityForm key="create" />, // Placeholder for create activity page
      },
      {
        path: "manageActivity/:id",
        element: <ActivityForm />, // Placeholder for create activity page
      },
      {
        path: "counter",
        element: <Counter />,
      },
      {
        path: "errors",
        element: <TestErrors />,
      },
      {
        path: "no-encontrado",
        element: <NotFound />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <Navigate replace to="no-encontrado" />,
      },
    ],
  },
]);
