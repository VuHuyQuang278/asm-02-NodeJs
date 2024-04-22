// Nhập module css
import style from "./InforHotel.module.css";

// Nhập thư viện FontAwesomeIcon và icon faLocationDot
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const InforHotel = (props) => {
  return (
    <div className={style.infor}>
      <div>
        <h2 className={style.title}>{props.name}</h2>
        <div className={style["address-container"]}>
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{props.address}</p>
        </div>
        <p className={style.distance}>{props.distance}</p>
        <p className={style.price}>{props.price}</p>
      </div>
      <div>
        <div className={style.btn}>Reserve or Book Now!</div>
      </div>
    </div>
  );
};

export default InforHotel;
