// Nhập module css
import style from "./ListHotel.module.css";
// Lấy dữ liệu từ file json
import data from "../../data/hotel_list.json";

import { useNavigate } from "react-router-dom";

const ListHotel = () => {
  const navigate = useNavigate();
  const handleOnClick = (e) => {
    e.preventDefault();
    navigate("./Detail");
  };

  return (
    <div className={style["hotel-container"]}>
      <h2 className={style.title}>Homes guests love</h2>
      <div className={style["hotel-content"]}>
        {data.map((item, i) => (
          <div key={i} className={style["img-content"]}>
            <img
              src={item.image_url}
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
              <p className={style["price"]}>Starting from ${item.price}</p>
              <p className={style["type"]}>
                <span className={style["rate"]}>{item.rate}</span> &nbsp;
                {item.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHotel;
