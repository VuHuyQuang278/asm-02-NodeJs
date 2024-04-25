// Nhập module css
import style from "./ListHotel.module.css";

import { useNavigate } from "react-router-dom";

const ListHotel = ({ hotelData }) => {
  const navigate = useNavigate();
  const handleOnClick = (e) => {
    e.preventDefault();
    navigate("./Detail");
  };

  const data = hotelData.top3Hotel;

  return (
    <div className={style["hotel-container"]}>
      <h2 className={style.title}>Homes guests love</h2>
      <div className={style["hotel-content"]}>
        {data.map((item, i) => (
          <div key={i} className={style["img-content"]}>
            <img
              src={item.photos[0]}
              alt="Hotel"
              className={style["image-hotel"]}
              // Thêm sự kiện click
              onClick={handleOnClick}
            />
            <div className={style.text}>
              <p className={style["hotel-name"]} onClick={handleOnClick}>
                {item.name}
              </p>
              <p className={style["city"]}>{item.city}</p>
              <p className={style["price"]}>
                Starting from ${item.cheapestPrice}
              </p>
              {/* <p className={style["type"]}>
                <span className={style["rate"]}>{item.rate}</span> &nbsp;
                {item.type}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHotel;
