// Nhập module css
import style from "./SearchPopup.module.css";

const SearchPopup = () => {
  return (
    <div>
      <form className={style.form}>
        <h3 className={style.text}>Search</h3>
        <div className={style["non-option"]}>
          <label htmlFor="destination">Destination</label>
          <input type="text" id="destination" className={style.input} />
        </div>
        <div className={style["non-option"]}>
          <label htmlFor="date">Check-in Date</label>
          <input
            type="text"
            id="date"
            placeholder="06/24/2022 to 06/24/2022"
            className={style.input}
          />
        </div>
        <div className={style["option-container"]}>
          <p>Options</p>
          <div className={style["option-content"]}>
            <div className={style.option}>
              <label htmlFor="min-price" className={style.text}>
                Min price per night
              </label>
              <input
                type="text"
                id="min-price"
                className={style["option-input"]}
              />
            </div>
            <div className={style.option}>
              <label htmlFor="max-price" className={style.text}>
                Max price per night
              </label>
              <input
                type="text"
                id="max-price"
                className={style["option-input"]}
              />
            </div>
            <div className={style.option}>
              <label htmlFor="adult" className={style.text}>
                Adult
              </label>
              <input
                type="text"
                id="adult"
                placeholder="1"
                className={style["option-input"]}
              />
            </div>
            <div className={style.option}>
              <label htmlFor="children" className={style.text}>
                Children
              </label>
              <input
                type="text"
                id="children"
                placeholder="0"
                className={style["option-input"]}
              />
            </div>
            <div className={style.option}>
              <label htmlFor="room" className={style.text}>
                Room
              </label>
              <input
                type="text"
                id="room"
                placeholder="1"
                className={style["option-input"]}
              />
            </div>
          </div>
        </div>
        <div className={style.btn}>Search</div>
      </form>
    </div>
  );
};

export default SearchPopup;
