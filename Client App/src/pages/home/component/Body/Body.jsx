// Nhập các componemt
import ListCity from "./ListCity";
import HotelType from "./HotelType";
import ListHotel from "./ListHotel";

import { useEffect, useCallback, useState } from "react";

const Body = () => {
  const [hotelData, setHotelData] = useState();

  const fetchHotelData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/");

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();

      console.log(data);
      setHotelData(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  return (
    <>
      {hotelData && (
        <>
          <ListCity hotelData={hotelData} />
          <HotelType hotelData={hotelData} />
          <ListHotel hotelData={hotelData} />
        </>
      )}
    </>
  );
};

export default Body;
