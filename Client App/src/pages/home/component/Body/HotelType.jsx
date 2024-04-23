// Nhập module css
import style from "./HotelType.module.css";
// Lấy dữ liệu từ file json
import data from "../../data/type.json";

const HotelType = () => {
  return (
    <div className={style["type-hotel-container"]}>
      <h2 className={style.title}>Browse by property type</h2>
      <div className={style["type-hotel-content"]}>
        {data.map((item, i) => (
          <div key={i} className={style["img-content"]}>
            <img
              src={item.image}
              alt="Type Hotel"
              className={style["image-type-hotel"]}
            />
            <div className={style.text}>
              <p className={style["type-name"]}>{item.name}</p>
              <p className={style["count"]}>{item.count} hotels</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelType;
