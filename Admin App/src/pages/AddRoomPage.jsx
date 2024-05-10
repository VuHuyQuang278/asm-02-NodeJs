import { useState, useEffect, useCallback } from "react";
import useInput from "../hooks/use-input";

import { useNavigate } from "react-router-dom";

const AddRoomPage = () => {
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState();

  const fetchHotelData = useCallback(async () => {
    const res = await fetch("http://localhost:5000/admin/hotel");

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await res.json();

    setHotelData(data);
  }, []);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "", "");

  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasError: descInputHasError,
    valueChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
    reset: resetDescInput,
  } = useInput((value) => value.trim() !== "", "");

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput((value) => value > 0, "");

  const {
    value: enteredMaxPeople,
    isValid: enteredMaxPeopleIsValid,
    hasError: maxPeopleInputHasError,
    valueChangeHandler: maxPeopleChangedHandler,
    inputBlurHandler: maxPeopleBlurHandler,
    reset: resetMaxPeopleInput,
  } = useInput((value) => value > 0, "");

  const {
    value: enteredRooms,
    isValid: enteredRoomsIsValid,
    hasError: roomsInputHasError,
    valueChangeHandler: roomsChangedHandler,
    inputBlurHandler: roomsBlurHandler,
    reset: resetRoomsInput,
  } = useInput((value) => value.trim() !== "", "");

  const formSubmitHandle = (event) => {
    event.preventDefault();

    if (!enteredTitleIsValid) {
      return;
    }

    if (!enteredDescIsValid) {
      return;
    }

    if (!enteredPriceIsValid) {
      return;
    }

    if (!enteredMaxPeopleIsValid) {
      return;
    }

    if (!enteredRoomsIsValid) {
      return;
    }

    const roomsArr = enteredRooms
      .split(",")
      .map((item) => parseInt(item.trim()));

    const body = {
      title: enteredTitle,
      price: enteredPrice,
      maxPeople: enteredMaxPeople,
      desc: enteredDesc,
      roomsNumbers: roomsArr,
    };

    const postHotelData = async (body) => {
      try {
        const res = await fetch("http://localhost:5000/admin/rooms/add-room", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          mode: "cors",
        });

        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await res.json();

        alert(data.message);

        resetTitleInput();
        resetDescInput();
        resetPriceInput();
        resetMaxPeopleInput();
        resetRoomsInput();

        navigate("/rooms");
      } catch (error) {
        console.log(error.message);
      }
    };

    postHotelData(body);
  };

  return (
    <>
      <h3 className="text-xl text-gray-400 pl-8 py-4 font-medium">
        Add New Room
      </h3>
      <div>
        <form onSubmit={formSubmitHandle}>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="roomTitle">Title</label>
              <div>
                <input
                  type="text"
                  name="roomTitle"
                  id="roomTitle"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="2 bed room"
                  onChange={titleChangedHandler}
                  onBlur={titleBlurHandler}
                  value={enteredTitle}
                />
                {titleInputHasError && (
                  <p className="text-red-600">Title must not be empty.</p>
                )}
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="roomDes">Description</label>
              <div>
                <input
                  type="text"
                  name="roomDes"
                  id="roomDes"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="King size bed, 1 bathroom"
                  onChange={descChangedHandler}
                  onBlur={descBlurHandler}
                  value={enteredDesc}
                />
                {descInputHasError && (
                  <p className="text-red-600">Description must not be empty.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="roomPrice">Price</label>
              <div>
                <input
                  type="text"
                  name="roomPrice"
                  id="roomPrice"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="100"
                  onChange={priceChangedHandler}
                  onBlur={priceBlurHandler}
                  value={enteredPrice}
                />
                {priceInputHasError && (
                  <p className="text-red-600">
                    The price must be a positive number.
                  </p>
                )}
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="maxPeople">Max People</label>
              <div>
                <input
                  type="text"
                  name="roomPrice"
                  id="roomPrice"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="2"
                  onChange={maxPeopleChangedHandler}
                  onBlur={maxPeopleBlurHandler}
                  value={enteredMaxPeople}
                />
                {maxPeopleInputHasError && (
                  <p className="text-red-600">
                    The max people must be a positive number.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="rooms">Rooms</label>
              <div>
                <textarea
                  name="roos"
                  id="rooms"
                  className="border-2 border-slate-800 p-2 w-full"
                  onChange={roomsChangedHandler}
                  onBlur={roomsBlurHandler}
                  value={enteredRooms}
                  placeholder="give comma between room numbers"
                ></textarea>
                {roomsInputHasError && (
                  <p className="text-red-600">Rooms must not be empty.</p>
                )}
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotel">Choose a hotel</label>
              <select
                name="hotel"
                id="hotel"
                className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1"
                // onChange={changeFeaturedHandler}
              >
                {hotelData &&
                  hotelData.map((hotel) => (
                    <option key={hotel._id} value={hotel.name}>
                      {hotel.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center mb-12">
            <button
              type="submit"
              className="w-1/12 p-1 text-slate-100 bg-teal-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoomPage;
