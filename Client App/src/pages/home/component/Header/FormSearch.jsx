// Nhập useState
import { useState } from "react";

import { useNavigate } from "react-router-dom";

// Nhập DateRange từ thư viện react-date-range
import { DateRange } from "react-date-range";

// Nhập module css
import style from "./FormSearch.module.css";

// Nhập style và theme cho Date Range
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Nhập hàm format để đinh dạng ngày tháng
import { format } from "date-fns";

import { searchActions } from "../../../../store/search";
import { useDispatch } from "react-redux";

const FormSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Khởi tạo state
  const [city, setCity] = useState();
  const [peopleNum, setPeopleNum] = useState();
  const [roomNum, setRoomNum] = useState();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);

  const CityChangeHandle = (event) => {
    setCity(event.target.value);
  };

  const peopleNumChangeHandle = (event) => {
    setPeopleNum(event.target.value);
  };

  const roomNumChangeHandle = (event) => {
    setRoomNum(event.target.value);
  };

  // Hàm xử lý sự kiện click vào nút Search
  const formSubmitHandle = (event) => {
    event.preventDefault();

    const body = {
      area: city,
      dateStart: format(date[0].startDate, "dd/MM/yyyy"),
      dateEnd: format(date[0].endDate, "dd/MM/yyyy"),
      peopleNum: peopleNum,
      roomNum: roomNum,
    };

    dispatch(searchActions.setSearchParams(body));

    // Chuyển sang trang Search
    navigate("/search");
  };

  return (
    <form className={style.form} onSubmit={formSubmitHandle}>
      <div className={style["input-container"]}>
        <div className="fa fa-bed"></div>
        <input
          className={style.input}
          type="text"
          placeholder="Where are you going?"
          value={city}
          onChange={CityChangeHandle}
        />
      </div>
      <div className={style["input-container"]}>
        <div className="fa fa-calendar"></div>
        <input
          // Thêm sự kiện click để đóng/mở Date Picker
          onClick={() => setOpen((open) => !open)}
          className={style.input}
          type="text"
          placeholder="06/24/2022 to 06/24/2022"
          // Hiển thị giá trị ngày tháng nhập từ Data Picker
          value={`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
            date[0].endDate,
            "dd/MM/yyyy"
          )}`}
          readOnly
        />
        {/* Kiểm tra state open để đóng/mở Date Picker */}
        {open && (
          <DateRange
            className={style.daterange}
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
        )}
      </div>
      <div className={style["input-container"]}>
        <div className="fa fa-female"></div>
        <input
          className={style.input}
          type="text"
          placeholder="1 adult &#8226; 0 children"
          value={peopleNum}
          onChange={peopleNumChangeHandle}
        />
        <input
          className={style.input}
          type="text"
          placeholder="Room"
          value={roomNum}
          onChange={roomNumChangeHandle}
        />
      </div>
      <button className={style.btn} type="submit">
        Search
      </button>
    </form>
  );
};

export default FormSearch;
