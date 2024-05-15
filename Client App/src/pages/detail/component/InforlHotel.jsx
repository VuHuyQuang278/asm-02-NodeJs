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
        <p className={style.distance}>
          Excellent location - {props.distance}m from center
        </p>
        <p className={style.price}>
          Book a stay over ${props.price} at this property and get a free
          airport taxi
        </p>
      </div>
      <div>
        <button onClick={props.onClick} className={style.btn}>
          Reserve or Book Now!
        </button>
      </div>
    </div>
  );
};

export default InforHotel;
