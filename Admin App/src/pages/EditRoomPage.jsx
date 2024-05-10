import { useState, useEffect, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";

const EditRoomPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const roomId = params.roomId;

  const [roomData, setRoomData] = useState();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredMaxPeople, setEnteredMaxPeople] = useState("");
  const [enteredRooms, setEnteredRooms] = useState("");

  const fetchHotelData = useCallback(async () => {
    const res = await fetch("http://localhost:5000/admin/rooms/edit/" + roomId);

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await res.json();

    setRoomData(data);
    setEnteredTitle(data.room.title);
    setEnteredDesc(data.room.desc);
    setEnteredPrice(data.room.price);
    setEnteredMaxPeople(data.room.maxPeople);
    setEnteredRooms(data.room.roomNumbers.join(", "));
  }, []);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  const titleChangedHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descChangedHandler = (event) => {
    setEnteredDesc(event.target.value);
  };
  const priceChangedHandler = (event) => {
    setEnteredPrice(event.target.value);
  };
  const maxPeopleChangedHandler = (event) => {
    setEnteredMaxPeople(event.target.value);
  };
  const roomsChangedHandler = (event) => {
    setEnteredRooms(event.target.value);
  };

  const formSubmitHandle = (event) => {
    event.preventDefault();

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
        const res = await fetch(
          "http://localhost:5000/admin/rooms/edit/" + roomId,
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

        setEnteredTitle("");
        setEnteredDesc("");
        setEnteredPrice("");
        setEnteredMaxPeople("");
        setEnteredRooms("");

        navigate("/rooms");
      } catch (error) {
        console.log(error.message);
      }
    };

    postHotelData(body);
  };

  return (
    <>
      <h3 className="text-xl text-gray-400 pl-8 py-4 font-medium">Edit Room</h3>
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
                  value={enteredTitle}
                />
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
                  value={enteredDesc}
                />
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
                  value={enteredPrice}
                />
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
                  value={enteredMaxPeople}
                />
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
                  value={enteredRooms}
                  placeholder="give comma between room numbers"
                ></textarea>
              </div>
            </div>
            <div className="w-5/12 flex flex-col gap-2">
              <label htmlFor="hotel">Choose a hotel</label>
              <select
                name="hotel"
                id="hotel"
                className="border-b-2 border-slate-700 focus:outline-none pl-2 pb-1"
              >
                {roomData &&
                  roomData.hotels.map((hotel) => (
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

export default EditRoomPage;
