import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/index";
import ResultsPage from "../pages/ResultsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
]);

