// Nhập module css
import style from "./SearchListItem.module.css";

const SearchListItem = (props) => {
  return (
    <div className={style["list-item-container"]}>
      <img src={props.image_url} alt="Hotel image" className={style.img} />
      <div className={style["hotel-props"]}>
        <div>
          <h3 className={style.title}>{props.name}</h3>
          <p>{props.distance} from center</p>
          <div className={style.tag}>{props.tag}</div>
          <p className={style.description}>{props.description}</p>
          <p className={style.type}>{props.type}</p>
          {/* Kiểm tra thuộc tính free_cancel để hiển thị */}
          <div
            className={`${style.cancel} ${!props.free_cancel && style.hide}`}
          >
            <h4 className={style["free-cancel"]}> Free cancellation</h4>
            <p>You an cancel later, so lock in this great price today!</p>
          </div>
        </div>
        <div>
          <div className={style["rate-container"]}>
            <p className={style["rate-text"]}>{props.rate_text}</p>
            <span className={style.rate}>{props.rate}</span>
          </div>
          <p className={style.price}>${props.price}</p>
          <p className={style.info}>Includes taxes and fees</p>
          <div className={style.btn}>See availability</div>
        </div>
      </div>
    </div>
  );
};

export default SearchListItem;
