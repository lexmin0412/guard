import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/home";
import OAuthGithub from "@/pages/oauth/github";

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
    {
      path: "/oauth",
      element: <OAuthGithub />,
    }
  ],
  {
    basename: "/guard/",
  }
);

export default router
