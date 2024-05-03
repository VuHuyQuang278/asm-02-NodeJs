import { useState } from "react";
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import style from "./FormBooking.module.css";
import "./style.css";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

import { format } from "date-fns";

const FormBooking = (props) => {
  // Lấy state từ reduc store
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  const roomsData = props.roomsData;
  const transactions = props.transactions;
  const hotelId = props.hotelId;

  const navigate = useNavigate();

  let fullName;
  let email;
  let phoneNumber;

  // Kiểm tra người dùng đã đăng nhập chưa
  if (isLogin) {
    fullName = user.fullName;
    email = user.email;
    phoneNumber = user.phoneNumber;
  }

  const [roomsAvailable, setroomsAvailable] = useState();
  const [enteredFullName, setEnteredFullName] = useState(fullName);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState(phoneNumber);
  const [enteredEmail, setEnteredEmail] = useState(email);
  const [rooms, setRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectPayMethod, setSelectPayMethod] = useState("choose-method");
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const fullNameChangeHandle = (event) => {
    setEnteredFullName(event.target.value);
  };

  const emailChangeHandle = (event) => {
    setEnteredEmail(event.target.value);
  };

  const phoneNumberChangeHandle = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const changePickHandler = (event) => {
    setDate((preState) => {
      preState.startDate = event.selection.startDate;
      preState.endDate = event.selection.endDate;
      return preState;
    });

    const avaiRooms = [];
    console.log(roomsData);
    console.log(transactions);

    for (let i = 0; i < roomsData.length; i++) {
      for (let j = 0; j < roomsData[i].roomNumbers.length; j++) {
        if (transactions.length !== 0) {
          for (let k = 0; k < transactions.length; k++) {
            const dateStart1 = new Date(transactions[k].dateStart);
            const dateEnd1 = new Date(transactions[k].dateEnd);
            const dateStart2 = new Date(event.selection.startDate);
            const dateEnd2 = new Date(event.selection.endDate);

            for (let l = 0; l < transactions[k].room.length; l++) {
              if (
                (roomsData[i].roomNumbers[j] === transactions[k].room[l] &&
                  dateEnd1 < dateStart2) ||
                dateStart1 > dateEnd2
              ) {
                avaiRooms[i].push(roomsData[i].roomNumbers[j]);
              }
            }
          }

          if (avaiRooms[i] === undefined) {
            avaiRooms[i] = [roomsData[i].roomNumbers[j]];
          } else {
            avaiRooms[i].push(roomsData[i].roomNumbers[j]);
          }
        } else {
          if (avaiRooms[i] === undefined) {
            avaiRooms[i] = [roomsData[i].roomNumbers[j]];
          } else {
            avaiRooms[i].push(roomsData[i].roomNumbers[j]);
          }
        }
      }
    }

    console.log(avaiRooms);
    setroomsAvailable(avaiRooms);

    // Lấy tất cả các checkbox trong trang
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Duyệt qua mỗi checkbox và đặt trạng thái của nó thành chưa được chọn
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false; // Set trạng thái của checkbox thành chưa được chọn
    });

    setRooms([]);
    setTotalPrice(0);
  };

  const changeRoomNumberHandler = (e) => {
    const price = e.target.defaultValue;

    if (e.target.checked) {
      setRooms((prevState) => {
        const checkIndex = rooms.findIndex(
          (element) => element === e.target.name
        );

        if (checkIndex === -1) {
          return [...prevState, e.target.name];
        } else {
          return [...prevState];
        }
      });

      setTotalPrice((prevState) => {
        return (
          prevState +
          +price * (date.endDate.getDate() - date.startDate.getDate())
        );
      });
    }

    if (!e.target.checked) {
      setRooms((prevState) => {
        const checkIndex = rooms.findIndex(
          (element) => element === e.target.name
        );

        prevState.splice(checkIndex, 1);

        return [...prevState];
      });

      setTotalPrice((prevState) => {
        return (
          prevState -
          +price * (date.endDate.getDate() - date.startDate.getDate())
        );
      });
    }
  };

  const changePayMethodHandler = (e) => {
    setSelectPayMethod(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kiểm tra người dùng đăng nhập chưa và các điều kiện liên quan
    if (isLogin) {
      if (date.endDate - date.startDate === 1) {
        alert("Please choose dates");
        return;
      } else if (selectPayMethod === "choose-method") {
        alert("Please select payment method");
        return;
      } else if (totalPrice === 0) {
        alert("Please choose rooms");
        return;
      }
    } else {
      // Không thì yêu cầu người dùng đăng nhập
      navigate("/login");
      alert("Login, please!");
    }

    const body = {
      user: user._id,
      hotel: hotelId,
      room: rooms,
      dateStart: format(date.startDate, "dd/MM/yyyy"),
      dateEnd: format(date.endDate, "dd/MM/yyyy"),
      price: totalPrice,
      payment: selectPayMethod,
      status: "Booked",
    };

    const fetchPostTransaction = async (body) => {
      try {
        const res = await fetch("http://localhost:5000/transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          mode: "cors",
        });

        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        navigate(`/transaction/${user._id}`);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPostTransaction(body);
  };

  return (
    <form onSubmit={handleSubmit} className={style["form-container"]}>
      <div className={style["date-infor"]}>
        <div className={style["form-date"]}>
          <h2 className={style.title}>Date</h2>
          <DateRange
            className={style.daterange}
            editableDateInputs={true}
            onChange={changePickHandler}
            moveRangeOnFirstSelection={false}
            ranges={[date]}
            minDate={new Date()}
          />
        </div>
        <div className={style["form-infor"]}>
          <h2 className={style.title}>Reserve Info</h2>
          <div className={style["input-container"]}>
            <label htmlFor="fullName" className={style.lable}>
              Your Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              className={style.input}
              onChange={fullNameChangeHandle}
              value={enteredFullName}
            />
          </div>
          <div className={style["input-container"]}>
            <label htmlFor="email" className={style.lable}>
              Your Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className={style.input}
              onChange={emailChangeHandle}
              value={enteredEmail}
            />
          </div>
          <div className={style["input-container"]}>
            <label htmlFor="phoneNumber" className={style.lable}>
              Your Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              className={style.input}
              onChange={phoneNumberChangeHandle}
              value={enteredPhoneNumber}
            />
          </div>
          <div className={style["input-container"]}>
            <label htmlFor="idCard" className={style.lable}>
              Your Identity Card Number
            </label>
            <input
              type="text"
              id="idCard"
              name="idCard"
              placeholder="Card Munber"
              className={style.input}
            />
          </div>
        </div>
      </div>
      <div>
        <h2>Select Rooms</h2>
        <div className={style["room-list"]}>
          {roomsData.map((room, i) => (
            <div key={room._id} className={style["desc-room"]}>
              <div className={style["room-infor"]}>
                <h3>{room.title}</h3>
                <p>{room.desc}</p>
                <p>
                  Max people:{" "}
                  <span className={style.price}>{room.maxPeople}</span>
                </p>
                <p className={style.price}>${room.price}</p>
              </div>
              <div className={style["room-numbers"]}>
                {roomsAvailable &&
                  roomsAvailable[i].map((item, index) => (
                    <div className={style["checkbox-room"]} key={index}>
                      <label htmlFor={item}>{item}</label>
                      <input
                        type="checkbox"
                        id={item}
                        name={item}
                        defaultValue={room.price}
                        onChange={changeRoomNumberHandler}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className={style["total-bill"]}>Total Bill: ${totalPrice}</h3>
        <div className={style.payment}>
          <select
            name="paymentMethod"
            id="paymentMethod"
            className={style.select}
            onChange={changePayMethodHandler}
          >
            <option value="choose-method">Select Payment Method</option>
            <option value="credit card">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
          <button type="submit" className={style.btn}>
            Reserve Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormBooking;
