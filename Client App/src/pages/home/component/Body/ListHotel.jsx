// Nhập module css
import style from "./ListHotel.module.css";

import { Link } from "react-router-dom";

const ListHotel = ({ hotelData }) => {
  const data = hotelData.top3Hotel;

  return (
    <div className={style["hotel-container"]}>
      <h2 className={style.title}>Homes guests love</h2>
      <div className={style["hotel-content"]}>
        {data.map((item, i) => (
          <div key={i} className={style["img-content"]}>
            <Link to={`/detail/${item._id}`}>
              <img
                src={item.photos[0]}
                alt="Hotel"
                className={style["image-hotel"]}
              />
              <div className={style.text}>
                <p className={style["hotel-name"]}>{item.name}</p>
                <p className={style["city"]}>{item.city}</p>
                <p className={style["price"]}>
                  Starting from ${item.cheapestPrice}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHotel;
