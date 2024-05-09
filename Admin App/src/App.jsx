import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import HotelPage from "./pages/HotelPage";
import AddHotelPage from "./pages/AddHotelPage";
import RoomPage from "./pages/RoomPage";
import AddRoomPage from "./pages/AddRoomPage";
import TransactionPage from "./pages/TransactionPage";

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
      {
        path: "rooms",
        children: [
          { index: true, element: <RoomPage /> },
          { path: "add-room", element: <AddRoomPage /> },
          // { path: "edit-room", element: <EditRoomPage /> },
        ],
      },
      { path: "transaction", element: <TransactionPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
