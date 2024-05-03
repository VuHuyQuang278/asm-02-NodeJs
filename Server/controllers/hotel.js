const User = require("../models/user");
const Hotel = require("../models/hotel");
const Transaction = require("../models/transaction");
const Room = require("../models/room");
const { ObjectId } = require("mongodb");
const user = require("../models/user");

exports.postSignUp = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;

  User.find()
    .then((users) => {
      // Kiểm tra user đã tồn tại chưa
      const user = users.find((user) => user.email === email);

      // Nếu không có thì tạo user mới
      if (!user) {
        const user = new User({
          userName,
          password,
          fullName,
          phoneNumber,
          email,
          isAdmin: false,
        });

        user
          .save()
          .then((result) => {
            return res.status(200).json({
              message: "Create user",
            });
          })
          .catch((err) => console.log(err));
      } else {
        res.status(200).json({
          message: "user already exists",
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user.password === password) {
        req.user = user;
        console.log(req.user);
        return res.status(200).json({
          user: user,
          message: "Logged in successfully",
        });
      } else {
        return res.status(401).json({
          message: "login unsuccessful",
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.getHotelsData = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      // Sắp xếp khách sạn theo rating
      hotels.sort((a, b) => b.rating - a.rating);
      // Lấy top 3 khách sạn
      const topHotels = hotels.slice(0, 3);

      // Hàm đếm số lượng khách sạn theo khu vực
      const countHotelsByArea = (arr, value) => {
        const count = arr.reduce((accumulator, currentValue) => {
          if (currentValue.city === value) {
            accumulator++;
          }
          return accumulator;
        }, 0);

        return count;
      };

      // // Hàm đếm số lượng khách sạn theo loại
      const countHotelsByType = (arr, key) => {
        const count = arr.reduce((accumulator, currentValue) => {
          if (currentValue.type === key) {
            accumulator++;
          }
          return accumulator;
        }, 0);

        return count;
      };

      // Đếm số lượng khách sạn theo từng khu vực
      const hotelsHn = countHotelsByArea(hotels, "Ha Noi");
      const hotelsHCM = countHotelsByArea(hotels, "Ho Chi Minh");
      const hotelsDn = countHotelsByArea(hotels, "Da Nang");

      // Đếm số lượng khách sạn theo từng loại
      const hotelNum = countHotelsByType(hotels, "hotel");
      const apartment = countHotelsByType(hotels, "apartment");
      const resort = countHotelsByType(hotels, "resort");
      const villa = countHotelsByType(hotels, "villa");
      const cabin = countHotelsByType(hotels, "cabin");

      res.status(200).json({
        hotelsByArea: {
          HaNoi: hotelsHn,
          HoChiMinh: hotelsHCM,
          DaNang: hotelsDn,
        },
        hotelsByType: {
          hotel: hotelNum,
          apartment,
          resort,
          villa,
          cabin,
        },
        top3Hotel: topHotels,
      });
    })
    .catch((err) => console.log(err));
};

exports.postSearchHotel = (req, res, next) => {
  const area = req.body.area;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const peopleNum = req.body.peopleNum;
  const roomNum = req.body.roomNum;

  async function findAvailableHotels(
    city,
    startDate,
    endDate,
    numPeople,
    numRooms
  ) {
    try {
      // Tìm kiếm các giao dịch đã đặt trong khoảng thời gian này
      const bookedTransactions = await Transaction.find({
        dateStart: { $lte: endDate },
        dateEnd: { $gte: startDate },
      }).select("hotel room");

      // Lấy danh sách các khách sạn đã đặt trong khoảng thời gian này
      const bookedHotels = bookedTransactions.map(
        (transaction) => transaction.hotel
      );

      // Tìm kiếm các khách sạn thoả mãn các điều kiện
      const availableHotels = await Hotel.find({
        city: city,
        _id: { $nin: bookedHotels }, // Không nằm trong danh sách khách sạn đã đặt
        "rooms.maxPeople": { $gte: numPeople }, // Có ít nhất một phòng đủ chỗ cho số lượng người mong muốn
      }).populate({
        path: "rooms",
        match: {
          roomNumbers: { $exists: true, $ne: [], $size: { $gte: numRooms } }, // Có ít nhất số lượng phòng mong muốn
        },
        select: "-roomNumbers", // Không hiển thị danh sách số phòng
      });

      return availableHotels;
    } catch (error) {
      console.error("Error finding available hotels:", error);
      throw error;
    }
  }
  findAvailableHotels(
    area,
    new Date(dateStart),
    new Date(dateEnd),
    +peopleNum,
    roomNum
  )
    .then((availableHotels) => {
      console.log("Available hotels:", availableHotels);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.getDetailHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;

  Hotel.findById(hotelId)
    .populate("rooms")
    .exec()
    .then((hotel) => {
      Transaction.find().then((transactions) => {
        return res.status(200).json({
          hotel,
          transactions,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postTransaction = (req, res, next) => {
  const user = new ObjectId(req.body.user);
  const hotel = new ObjectId(req.body.hotel);
  const room = req.body.room;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const price = req.body.price;
  const payment = req.body.payment;
  const status = req.body.status;

  const transaction = new Transaction({
    user,
    hotel,
    room,
    dateStart,
    dateEnd,
    price,
    payment,
    status,
  });

  transaction
    .save()
    .then((result) => {
      res.status(200).json({
        message: "create transaction!",
      });
    })
    .catch((err) => console.log(err));
};

exports.getTransaction = (req, res, next) => {
  const userId = new ObjectId(req.params.userId);
  Transaction.find({ user: userId })
    .populate("hotel")
    .exec()
    .then((transactions) => {
      return res.status(200).json(transactions);
    })
    .catch((err) => console.log(err));
};
