// Nhập module css
import style from "./ListCity.module.css";
import HaNoiImg from "../../../../assets/HaNoi.jpg";
import HCMImg from "../../../../assets/HCM.jpg";
import DaNangImg from "../../../../assets/DaNang.jpg";

const ListCity = (props) => {
  return (
    <div className={style["listcity-content"]}>
      <div className={style["img-content"]}>
        <img src={HaNoiImg} alt="City" className={style["image-city"]} />
        <div className={style.text}>
          <p className={style["city-name"]}>Ha Noi</p>
          <p className={style["subtext"]}>
            {props.hotelData.hotelsByArea.HaNoi} properties
          </p>
        </div>
      </div>
      <div className={style["img-content"]}>
        <img src={HCMImg} alt="City" className={style["image-city"]} />
        <div className={style.text}>
          <p className={style["city-name"]}>Ho Chi Minh</p>
          <p className={style["subtext"]}>
            {props.hotelData.hotelsByArea.HoChiMinh} properties
          </p>
        </div>
      </div>
      <div className={style["img-content"]}>
        <img src={DaNangImg} alt="City" className={style["image-city"]} />
        <div className={style.text}>
          <p className={style["city-name"]}>Da Nang</p>
          <p className={style["subtext"]}>
            {props.hotelData.hotelsByArea.DaNang} properties
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListCity;
