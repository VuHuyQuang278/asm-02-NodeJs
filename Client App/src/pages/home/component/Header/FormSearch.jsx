// Nhập useState
import { useState } from "react";

// Nhập DateRange từ thư viện react-date-range
import { DateRange } from "react-date-range";

// Nhập module css
import style from "./FormSearch.module.css";

// Nhập style và theme cho Date Range
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Nhập hàm format để đinh dạng ngày tháng
import { format } from "date-fns";

const FormSearch = () => {
  // Khởi tạo state
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);

  // Hàm xử lý sự kiện click vào nút Search
  const handleOnClick = (e) => {
    e.preventDefault();
    // Chuyển sang trang Search
    window.location.replace("./Search");
  };

  return (
    <form className={style.form}>
      <div className={style["input-container"]}>
        <div className="fa fa-bed"></div>
        <input
          className={style.input}
          type="text"
          placeholder="Where are you going?"
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
          placeholder="1 adult &#8226; 0 children &#8226; 1 room"
        />
      </div>
      <button className={style.btn} onClick={handleOnClick}>
        Search
      </button>
    </form>
  );
};

export default FormSearch;
