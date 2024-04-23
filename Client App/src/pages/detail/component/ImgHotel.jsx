// Nhập module css
import style from "./ImgHotel.module.css";

const ImgHotel = (props) => {
  return (
    <div className={style["img-container"]}>
      {props.photos.map((item, i) => (
        <img src={item} alt="hotel" key={i} className={style.img} />
      ))}
    </div>
  );
};

export default ImgHotel;
