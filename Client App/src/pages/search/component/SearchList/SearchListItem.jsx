// Nhập module css
import style from "./SearchListItem.module.css";

import { Link } from "react-router-dom";

const SearchListItem = (props) => {
  return (
    <div className={style["list-item-container"]}>
      <img src={props.image_url} alt="Hotel" className={style.img} />
      <div className={style["hotel-props"]}>
        <div className={style["hotel-infor"]}>
          <h3 className={style.title}>{props.name}</h3>
          <p>{props.distance} from center</p>
          <p className={style.description}>{props.description}</p>
          {/* Kiểm tra thuộc tính free_cancel để hiển thị */}
          <div className={`${style.cancel} `}>
            <h4 className={style["free-cancel"]}> Free cancellation</h4>
            <p>You an cancel later, so lock in this great price today!</p>
          </div>
        </div>
        <div className={style["rate-content"]}>
          <div className={style["rate-container"]}>
            <span className={style.rate}>{props.rate}</span>
          </div>
          <p className={style.price}>${props.price}</p>
          <p className={style.info}>Includes taxes and fees</p>
          <Link to={`/detail/${props.hotelId}`} className={style.btn}>
            See availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchListItem;
