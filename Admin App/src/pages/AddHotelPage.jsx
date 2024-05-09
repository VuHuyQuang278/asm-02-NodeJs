import { useState, useEffect, useCallback } from "react";
import useInput from "../hooks/use-input";

import { useNavigate } from "react-router-dom";

const AddHotelPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [rooms, setRooms] = useState([]);
  const [featured, setFeatured] = useState("no");

  const fetchHotelData = useCallback(async () => {
    const res = await fetch("http://localhost:5000/admin/hotel/add-hotel");

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await res.json();

    setData(resData);
  }, []);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  const imageUrlChangeHandle = (event) => {
    setImageUrl(event.target.value);
  };

  const changeFeaturedHandler = (e) => {
    setFeatured(e.target.value);
  };

  const changeRoomNumberHandler = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRooms([...rooms, value]);
    } else {
      setRooms(rooms.filter((item) => item !== value));
    }
  };

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredType,
    isValid: enteredTypeIsValid,
    hasError: typeInputHasError,
    valueChangeHandler: typeChangedHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetTypeInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangedHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddressInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDistance,
    isValid: enteredDistanceIsValid,
    hasError: distanceInputHasError,
    valueChangeHandler: distanceChangedHandler,
    inputBlurHandler: distanceBlurHandler,
    reset: resetDistanceInput,
  } = useInput((value) => value > 0);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasError: descInputHasError,
    valueChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
    reset: resetDescInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput((value) => value > 0);

  const {
    value: enteredRating,
    isValid: enteredRatingIsValid,
    hasError: ratingInputHasError,
    valueChangeHandler: ratingChangedHandler,
    inputBlurHandler: ratingBlurHandler,
    reset: resetRatingInput,
  } = useInput((value) => value <= 5 && value >= 0 && value.trim() !== "");

  const formSubmitHandle = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    if (!enteredTypeIsValid) {
      return;
    }

    if (!enteredCityIsValid) {
      return;
    }

    if (!enteredAddressIsValid) {
      return;
    }

    if (!enteredDistanceIsValid) {
      return;
    }

    if (!enteredTitleIsValid) {
      return;
    }

    if (!enteredDescIsValid) {
      return;
    }

    if (!enteredPriceIsValid) {
      return;
    }

    if (!enteredRatingIsValid) {
      return;
    }

    if (rooms.length === 0) {
      alert("Please choose at least 1 room");
      return;
    }

    const body = {
      name: enteredName,
      type: enteredType,
      city: enteredCity,
      address: enteredAddress,
      distance: enteredDistance,
      title: enteredTitle,
      photos: imageUrl,
      desc: enteredDesc,
      cheapestPrice: enteredPrice,
      rating: enteredRating,
      featured: featured === "no" ? false : true,
      rooms,
    };

    const postHotelData = async (body) => {
      try {
        const res = await fetch("http://localhost:5000/admin/hotel/add-hotel", {
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

        resetNameInput();
        resetTypeInput();
        resetCityInput();
        resetAddressInput();
        resetDistanceInput();
        resetTitleInput();
        resetDescInput();
        resetPriceInput();
        resetRatingInput();
        setImageUrl("");
        // Lấy tất cả các checkbox trong trang
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Duyệt qua mỗi checkbox và đặt trạng thái của nó thành chưa được chọn
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = false; // Set trạng thái của checkbox thành chưa được chọn
        });

        navigate("/hotel");
      } catch (error) {
        console.log(error.message);
      }
    };

    postHotelData(body);
  };

  return (
    <>
      <h3 className="text-xl text-gray-400 pl-8 py-4 font-medium">
        Add New Hotel
      </h3>
      <div>
        <form className="w-full py-6" onSubmit={formSubmitHandle}>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelName">Name</label>
              <div>
                <input
                  type="text"
                  name="hotelName"
                  id="hotelName"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="My Hotel"
                  onChange={nameChangedHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
                />
                {nameInputHasError && (
                  <p className="text-red-600">Name hotel must not be empty.</p>
                )}
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelType">Type</label>
              <div>
                <input
                  type="text"
                  name="hotelType"
                  id="hotelType"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="Hotel"
                  onChange={typeChangedHandler}
                  onBlur={typeBlurHandler}
                  value={enteredType}
                />
                {typeInputHasError && (
                  <p className="text-red-600">Type hotel must not be empty.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="cityName">City</label>
              <div>
                <input
                  type="text"
                  name="cityName"
                  id="cityName"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="City"
                  onChange={cityChangedHandler}
                  onBlur={cityBlurHandler}
                  value={enteredCity}
                />
                {cityInputHasError && (
                  <p className="text-red-600">Name city must not be empty.</p>
                )}
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelAddress">Address</label>
              <div>
                <input
                  type="text"
                  name="hotelAddress"
                  id="hotelAddress"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="Elton st, 126"
                  onChange={addressChangedHandler}
                  onBlur={addressBlurHandler}
                  value={enteredAddress}
                />
                {addressInputHasError && (
                  <p className="text-red-600">Address must not be empty.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="distance">Distance from City Center</label>
              <div>
                <input
                  type="text"
                  name="distance"
                  id="distance"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="500"
                  onChange={distanceChangedHandler}
                  onBlur={distanceBlurHandler}
                  value={enteredDistance}
                />
                {distanceInputHasError && (
                  <p className="text-red-600">
                    The distance must be a positive number.
                  </p>
                )}
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelTitle">Title</label>
              <div>
                <input
                  type="text"
                  name="hotelTitle"
                  id="hotelTitle"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="The best Hotel"
                  onChange={titleChangedHandler}
                  onBlur={titleBlurHandler}
                  value={enteredTitle}
                />
                {titleInputHasError && (
                  <p className="text-red-600">Title must not be empty.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelDesc">Description</label>
              <div>
                <input
                  type="text"
                  name="hotelDesc"
                  id="hotelDesc"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="Description"
                  onChange={descChangedHandler}
                  onBlur={descBlurHandler}
                  value={enteredDesc}
                />
                {descInputHasError && (
                  <p className="text-red-600">Description must not be empty.</p>
                )}
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelPrice">Price</label>
              <div>
                <input
                  type="text"
                  name="hotelPrice"
                  id="hotelPrice"
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
          </div>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelRating">Rating</label>
              <div>
                <input
                  type="text"
                  name="hotelRating"
                  id="hotelRating"
                  className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1 w-full"
                  placeholder="Rating"
                  onChange={ratingChangedHandler}
                  onBlur={ratingBlurHandler}
                  value={enteredRating}
                />
                {ratingInputHasError && (
                  <p className="text-red-600">
                    Rating must be a number between 0 and 5.
                  </p>
                )}
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelPhotos">Images</label>
              <input
                type="text"
                name="hotelPhotos"
                id="hotelPhotos"
                className="border-2 border-slate-700 focus:outline-none pl-2 py-1"
                placeholder="ImageUrl"
                onChange={imageUrlChangeHandle}
                value={imageUrl}
              />
            </div>
          </div>
          <div className="flex items-center w-10/12 mx-auto justify-between mb-8">
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotelFeatured">Featured</label>
              <select
                name="hotelFeatured"
                id="hotelFeatured"
                className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1"
                onChange={changeFeaturedHandler}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="w-5/12 flex flex-col gap-2"></div>
          </div>
          <div className="w-10/12 mx-auto mb-8">
            <h4 className="mb-4">Rooms</h4>
            <div className="grid grid-cols-4 gap-4">
              {data &&
                data.map((room) => (
                  <div
                    key={room._id}
                    className="flex items-center justify-start gap-4"
                  >
                    <label htmlFor={room.title}>{room.title}</label>
                    <input
                      type="checkbox"
                      id={room.title}
                      name={room.title}
                      value={room._id}
                      onChange={changeRoomNumberHandler}
                    />
                  </div>
                ))}
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
export default AddHotelPage;
