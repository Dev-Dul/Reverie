import Home from "./components/home";
import Blog from './components/blog';
import App from "./App";
import NewBlog from "./components/newblog";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import Profile from "./components/profile";
import ErrorPage from "./components/errorpage";
import Post from "./components/post";
import About from "./components/about";

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
      { path: "/about", element: <About />, },
      { path: "/explore/create", element: <NewBlog />, },
      { path: "/explore/posts/:postId", element: <Post />, }
    ],
  },
];

export default routes;