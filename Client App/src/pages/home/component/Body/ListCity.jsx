// Nhập module css
import style from "./ListCity.module.css";
// Lấy dữ liệu từ file json
import ListCitydata from "../../data/city.json";

const ListCity = () => {
  return (
    <div className={style["listcity-content"]}>
      {/* Hiển thị danh sách các thành phố */}
      {ListCitydata.map((item, i) => (
        <div key={i} className={style["img-content"]}>
          <img src={item.image} alt="City" className={style["image-city"]} />
          <div className={style.text}>
            <p className={style["city-name"]}>{item.name}</p>
            <p className={style["subtext"]}>{item.subText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCity;
