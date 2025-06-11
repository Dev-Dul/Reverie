import Home from "./components/home";
import Blog from './components/blog';
import App from "./App";
import NewBlog from "./components/newblog";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import Profile from "./components/profile";
import ErrorPage from "./components/errorpage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true,  element: <Home /> },
      { path: "/explore", element: <Blog />, },
      { path: "/signup", element: <SignUp />, },
      { path: "/login", element: <LogIn />, },
      { path: "/profile", element: <Profile />, },
      { path: "/explore/create", element: <NewBlog />, }
    ],
  },
];

export default routes;