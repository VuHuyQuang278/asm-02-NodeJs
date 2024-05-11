// Nhập module css
import style from "./SearchPopup.module.css";

// Nhập style và theme cho Date Range
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Nhập hàm format để đinh dạng ngày tháng
import { format } from "date-fns";
import { DateRange } from "react-date-range";

import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import useInput from "../../../../hooks/use-input";

const SearchPopup = (props) => {
  const searchParams = useSelector((state) => state.search.searchParams);

  // Khởi tạo state
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [open, setOpen] = useState(false);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangedHandle,
    inputBlurHandler: cityBlurHandle,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: peopleNum,
    isValid: peopleNumIsValid,
    hasError: peopleNumHasError,
    valueChangeHandler: peopleNumChangedHandle,
    inputBlurHandler: peopleNumBlurHandle,
    reset: resetPeopleNumInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: roomNum,
    isValid: roomNumIsValid,
    hasError: roomNumHasError,
    valueChangeHandler: roomNumChangedHandle,
    inputBlurHandler: roomNumBlurHandle,
    reset: reseRroomNumInput,
  } = useInput((value) => value.trim() !== "");

  const fetchHotelData = useCallback(
    async (body) => {
      try {
        const res = await fetch("http://localhost:5000/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          mode: "cors",
        });

        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await res.json();

        props.setData(data);
      } catch (error) {
        console.log(error.message);
      }
    },
    [props]
  );

  useEffect(() => {
    if (searchParams.area || searchParams.peopleNum || searchParams.roomNum) {
      fetchHotelData(searchParams);
    }
  }, [searchParams, fetchHotelData]);

  const formSubmitHandle = (event) => {
    event.preventDefault();

    if (!cityIsValid) {
      return;
    }

    if (!peopleNumIsValid) {
      return;
    }

    if (!roomNumIsValid) {
      return;
    }

    const body = {
      area: city,
      dateStart: format(date.startDate, "dd/MM/yyyy"),
      dateEnd: format(date.endDate, "dd/MM/yyyy"),
      peopleNum: peopleNum,
      roomNum: roomNum,
    };

    console.log(body);

    resetCityInput();
    resetPeopleNumInput();
    reseRroomNumInput();
    fetchHotelData(body);
  };

  return (
    <div>
      <form className={style.form} onSubmit={formSubmitHandle}>
        <h3 className={style.text}>Search</h3>
        <div className={style["non-option"]}>
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            className={style.input}
            onChange={cityChangedHandle}
            onBlur={cityBlurHandle}
            value={city}
          />
          {cityHasError && (
            <p className={style["err-mess"]}>Destination must not be empty.</p>
          )}
        </div>
        <div className={style["non-option"]}>
          <label htmlFor="date">Check-in Date</label>
          <input
            // Thêm sự kiện click để đóng/mở Date Picker
            onClick={() => setOpen((open) => !open)}
            className={style.input}
            type="text"
            placeholder="06/24/2022 to 06/24/2022"
            // Hiển thị giá trị ngày tháng nhập từ Data Picker
            value={`${format(date.startDate, "dd/MM/yyyy")} to ${format(
              date.endDate,
              "dd/MM/yyyy"
            )}`}
            readOnly
          />
          {/* Kiểm tra state open để đóng/mở Date Picker */}
          {open && (
            <DateRange
              className={style.daterange}
              editableDateInputs={true}
              onChange={(item) => setDate(item.selection)}
              moveRangeOnFirstSelection={false}
              ranges={[date]}
              minDate={new Date()}
            />
          )}
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
              <label htmlFor="peopleNum" className={style.text}>
                Number of people
              </label>
              <input
                type="text"
                id="peopleNum"
                className={style["option-input"]}
                onChange={peopleNumChangedHandle}
                onBlur={peopleNumBlurHandle}
                value={peopleNum}
              />
            </div>
            {peopleNumHasError && (
              <p className={style["err-mess"]}>
                Number of people must not be empty.
              </p>
            )}

            <div className={style.option}>
              <label htmlFor="room" className={style.text}>
                Room
              </label>
              <input
                type="text"
                id="room"
                className={style["option-input"]}
                onChange={roomNumChangedHandle}
                onBlur={roomNumBlurHandle}
                value={roomNum}
              />
            </div>
            {roomNumHasError && (
              <p className={style["err-mess"]}>
                Number of room must not be empty.
              </p>
            )}
          </div>
        </div>
        <button type="submit" className={style.btn}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchPopup;
