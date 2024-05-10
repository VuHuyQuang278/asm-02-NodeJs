import { useState, useEffect, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";

const EditHotelPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const hotelId = params.hotelId;

  const [data, setData] = useState();

  const [imageUrl, setImageUrl] = useState("");
  const [rooms, setRooms] = useState([]);
  const [featured, setFeatured] = useState("no");
  const [enteredName, setEnteredName] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredDistance, setEnteredDistance] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredRating, setEnteredRating] = useState("");

  const fetchHotelData = useCallback(async () => {
    const res = await fetch(
      "http://localhost:5000/admin/hotel/edit/" + hotelId
    );

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await res.json();
    console.log(resData);

    setData(resData);
    setEnteredName(resData.hotel.name);
    setEnteredType(resData.hotel.type);
    setEnteredCity(resData.hotel.city);
    setEnteredAddress(resData.hotel.address);
    setEnteredDistance(resData.hotel.distance);
    setEnteredTitle(resData.hotel.title);
    setEnteredDesc(resData.hotel.desc);
    setEnteredPrice(resData.hotel.cheapestPrice);
    setEnteredRating(resData.hotel.rating);
    setImageUrl(resData.hotel.photos);
  }, []);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  const nameChangedHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const typeChangedHandler = (event) => {
    setEnteredType(event.target.value);
  };

  const cityChangedHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const addressChangedHandler = (event) => {
    setEnteredAddress(event.target.value);
  };

  const distanceChangedHandler = (event) => {
    setEnteredDistance(event.target.value);
  };

  const titleChangedHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descChangedHandler = (event) => {
    setEnteredDesc(event.target.value);
  };

  const priceChangedHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const ratingChangedHandler = (event) => {
    setEnteredRating(event.target.value);
  };

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

  const formSubmitHandle = (event) => {
    event.preventDefault();

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

    console.log(body);

    const postHotelData = async (body) => {
      try {
        const res = await fetch(
          "http://localhost:5000/admin/hotel/edit/" + hotelId,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            mode: "cors",
          }
        );

        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await res.json();

        alert(data.message);

        setEnteredName("");
        setEnteredType("");
        setEnteredCity("");
        setEnteredAddress("");
        setEnteredDistance("");
        setEnteredTitle("");
        setEnteredDesc("");
        setEnteredPrice("");
        setEnteredRating("");
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
      {data && (
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
                      value={enteredName}
                    />
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
                      value={enteredType}
                    />
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
                      value={enteredCity}
                    />
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
                      value={enteredAddress}
                    />
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
                      value={enteredDistance}
                    />
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
                      value={enteredTitle}
                    />
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
                      value={enteredDesc}
                    />
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
                      value={enteredPrice}
                    />
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
                      value={enteredRating}
                    />
                  </div>
                </div>
                <div className="w-5/12 flex flex-col gap-2">
                  <label htmlFor="hotelPhotos">Images</label>
                  <textarea
                    type="text"
                    name="hotelPhotos"
                    id="hotelPhotos"
                    className="border-2 border-slate-700 focus:outline-none pl-2 py-1"
                    placeholder="ImageUrl"
                    onChange={imageUrlChangeHandle}
                    value={imageUrl}
                  ></textarea>
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
                    data.rooms.map((room) => (
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
      )}
    </>
  );
};

export default EditHotelPage;
