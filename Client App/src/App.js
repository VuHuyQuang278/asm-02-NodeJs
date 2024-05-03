import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import Transaction from "./pages/transaction/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "detail/:hotelId", element: <Detail /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "transaction/:userId", element: <Transaction /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
