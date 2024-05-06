import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <AdminPage /> },
      // { path: "hotel", element: <HotelPage /> },
      // { path: "room", element: <RoomPage /> },
      // { path: "transaction", element: <TransactionPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
