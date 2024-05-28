import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/home";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ],
  {
    basename: "/guard/",
  }
);

export default router
