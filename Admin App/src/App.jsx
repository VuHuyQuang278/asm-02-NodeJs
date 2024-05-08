import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import HotelPage from "./pages/HotelPage";
import AddHotelPage from "./pages/AddHotelPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <AdminPage /> },
      {
        path: "hotel",
        children: [
          { index: true, element: <HotelPage /> },
          { path: "add-hotel", element: <AddHotelPage /> },
          // { path: "edit-hotel/:hotelId", element: <EditHotelPage /> },
        ],
      },
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
