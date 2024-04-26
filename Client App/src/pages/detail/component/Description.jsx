// Nhập module css
import style from "./Description.module.css";
import { Link } from "react-router-dom";

const Description = (props) => {
  return (
    <div className={style["description-container"]}>
      <div className={style["description-content"]}>
        <h3 className={style.title}>{props.title}</h3>
        <p className={style.description}>{props.description}</p>
      </div>
      <div className={style.price}>
        {/* <h3 className={style["price-title"]}>Perfect for 9-night stay!</h3> */}
        {/* <p className={style["rate-text"]}>
          Located in the real heart of Krakow, this property has an excellent
          location score of 9.8!
        </p> */}
        <p className={style["price-nine"]}>
          <span className={style.number}>${props.cheapestPrice}</span> (9
          nights)
        </p>
        <Link to={"/"} className={style.btn}>
          Reserve or Book Now!
        </Link>
      </div>
    </div>
  );
};

export default Description;
