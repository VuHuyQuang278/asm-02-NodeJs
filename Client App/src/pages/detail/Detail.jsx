// Nhập module css
import style from "./Detail.module.css";

// Nhập các component
import NavBar from "../home/component/Navbar/Navbar";
import Form from "../home/component/Form/Form";
import Footer from "../home/component/Footer/Footer";
import InforHotel from "./component/InforlHotel";
import ImgHotel from "./component/ImgHotel";
import Description from "./component/Description";

// Lấy dữ liệu từ file json
// import detailData from "./data/detail.json";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Detail = () => {
  const params = useParams();

  const hotelId = params.hotelId;

  const [hotelData, setHotelData] = useState();

  const fetchHotelData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/detail/" + hotelId);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();

      console.log(data);
      setHotelData(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  return (
    <>
      <div className={style["nav-container"]}>
        <div className={style.nav}>
          <NavBar />
        </div>
      </div>
      {hotelData && (
        <div>
          <InforHotel
            name={hotelData.name}
            address={hotelData.address}
            distance={hotelData.distance}
            price={hotelData.cheapestPrice}
          />
          <ImgHotel photos={hotelData.photos} />
          <Description
            title={hotelData.title}
            description={hotelData.desc}
            cheapestPrice={hotelData.cheapestPrice}
          />
        </div>
      )}
      <Form />
      <Footer />
    </>
  );
};

export default Detail;
