import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";

const TransactionPage = () => {
  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    const res = await fetch("http://localhost:5000/admin/transactions");

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const dataRes = await res.json();
    console.log(dataRes);

    setData(dataRes);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h3 className="text-2xl text-gray-400 my-4 px-12 font-medium">
        Transactions List
      </h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Hotel
              </th>
              <th scope="col" className="px-6 py-3">
                Room
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr
                  key={item._id}
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
                    {item._id}
                  </th>
                  <td className="px-6 py-4"> {item.user.userName}</td>
                  <td className="px-6 py-4"> {item.hotel.name}</td>
                  <td className="px-6 py-4">
                    {item.room.map((roomNum, i) => {
                      return (
                        <p key={i}>
                          {roomNum}
                          {i !== item.room.length - 1 && ","}
                        </p>
                      );
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {format(new Date(item.dateStart), "MM/dd/yyyy")} -{" "}
                    {format(new Date(item.dateEnd), "MM/dd/yyyy")}
                  </td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4 capitalize"> {item.payment}</td>
                  <td className="flex items-center px-6 py-4">
                    {item.status === "Booked" ? (
                      <p className="px-2 py-1 rounded-md bg-red-100 font-medium text-green-500">
                        {item.status}
                      </p>
                    ) : item.status === "Checkin" ? (
                      <p className="px-2 py-1 rounded-md bg-green-200 font-medium text-green-500">
                        {item.status}
                      </p>
                    ) : (
                      <p className="px-2 py-1 rounded-md bg-blue-100 font-medium text-gray-500">
                        {item.status}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionPage;
