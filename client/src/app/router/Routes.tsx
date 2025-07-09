import App from "../layout/App";
import { createBrowserRouter } from "react-router";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/details/ActivityDetail";

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
        element: <ActivityDetail />, // Placeholder for activity details page
      },
      {
        path: "createActivity",
        element: <ActivityForm key="create" />, // Placeholder for create activity page
      },
      {
        path: "manageActivity/:id",
        element: <ActivityForm />, // Placeholder for create activity page
      },
    ],
  },
]);
