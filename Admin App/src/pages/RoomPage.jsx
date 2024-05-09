import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const RoomPage = () => {
  const [roomsData, setRoomsData] = useState();

  const fetchRoomsData = useCallback(async () => {
    const res = await fetch("http://localhost:5000/admin/rooms");

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await res.json();

    setRoomsData(data);
  }, []);

  useEffect(() => {
    fetchRoomsData();
  }, [fetchRoomsData]);

  const deleteRoomHandle = (roomId) => {
    if (confirm("Are you sure you want to delete the room?") === true) {
      const postDeleteRoom = async (roomId) => {
        try {
          const res = await fetch(
            "http://localhost:5000/admin/rooms/delete-room",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ roomId }),
              mode: "cors",
            }
          );

          if (!res.ok) {
            throw new Error("Something went wrong!");
          }

          const data = await res.json();

          alert(data.message);

          fetchRoomsData();
        } catch (error) {
          console.log(error.message);
        }
      };

      postDeleteRoom(roomId);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pt-8 pb-6">
        <h3 className="text-xl text-gray-400 pl-8 font-medium">Rooms List</h3>
        <Link
          to={"add-room"}
          className="text-green-700 p-1 border-2 border-green-700 rounded"
        >
          Add New
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-12">
          <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border">
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Max People
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {roomsData &&
              roomsData.map((room) => (
                <tr
                  key={room._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {room._id}
                  </th>
                  <td className="px-6 py-4"> {room.title}</td>
                  <td className="px-6 py-4"> {room.desc}</td>
                  <td className="px-6 py-4"> {room.price}</td>
                  <td className="px-6 py-4"> {room.maxPeople}</td>
                  <td className="px-6 py-4 flex items-center justify-evenly gap-2">
                    <button
                      // onClick={() => deleteHotelHandle(hotel._id)}
                      className="p-1 bg-green-200 border border-green-500 text-green-700 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRoomHandle(room._id)}
                      className="p-1 bg-red-50 border border-red-400 text-red-600 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RoomPage;
