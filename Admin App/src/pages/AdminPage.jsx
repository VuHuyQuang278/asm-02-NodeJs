import { useState, useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faSackDollar,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const AdminPage = () => {
  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    const res = await fetch("http://localhost:5000/admin/");

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const dataRes = await res.json();

    setData(dataRes);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {data && (
        <div>
          <div className="flex items-center justify-evenly pt-8 pb-16">
            <div className="border-2 w-1/5 pl-4 rounded-b-lg border-t-0 shadow-md">
              <h3 className="font-medium text-gray-400 pb-4">USERS</h3>
              <p className="text-2xl pb-2">{data.totalUser}</p>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ color: "#d84b4b" }}
                  className="p-1 bg-red-100 mx-2 my-2"
                />
              </div>
            </div>
            <div className="border-2 w-1/5 pl-4 rounded-b-lg border-t-0 shadow-md">
              <h3 className="font-medium text-gray-400 pb-4">ORDER</h3>
              <p className="text-2xl pb-2">{data.orders}</p>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: "#FFD43B" }}
                  className="p-1 bg-amber-100 mx-2 my-2"
                />
              </div>
            </div>
            <div className="border-2 w-1/5 pl-4 rounded-b-lg border-t-0 shadow-md">
              <h3 className="font-medium text-gray-400 pb-4">EARNINGS</h3>
              <p className="text-2xl pb-2">$ {data.earnings}</p>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faSackDollar}
                  style={{ color: "#15d157" }}
                  className="p-1 bg-green-200 mx-2 my-2"
                />
              </div>
            </div>
            <div className="border-2 w-1/5 pl-4 rounded-b-lg border-t-0 shadow-md">
              <h3 className="font-medium text-gray-400 pb-4">BALANCE</h3>
              <p className="text-2xl pb-2">$ {data.earnings}</p>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faSackDollar}
                  style={{ color: "#15d157" }}
                  className="p-1 bg-green-200 mx-2 my-2"
                />
              </div>
            </div>
          </div>
          <div className="mb-12">
            <h3 className="text-xl text-gray-400 mb-4 px-12">
              Latest Transaction
            </h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
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
                  {data.listTran.map((item) => (
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
                        {item.room.map((item, i) => {
                          return <p key={i}>{item}&nbsp;</p>;
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
            <div className="flex justify-end items-center gap-6 mt-6">
              <p>1-8 of 8</p>
              <FontAwesomeIcon icon={faChevronLeft} size="xs" />
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
