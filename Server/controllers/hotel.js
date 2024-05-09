const User = require("../models/user");
const Hotel = require("../models/hotel");
const Transaction = require("../models/transaction");
const { ObjectId } = require("mongodb");

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

  // Xác thực tài khoản đăng nhập
  User.findOne({ email: email })
    .then((user) => {
      if (user.password === password) {
        req.user = user;
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

  const dateStart2 = new Date(dateStart);
  const dateEnd2 = new Date(dateEnd);

  // Tìm kiếm các khách sạn dựa theo tiêu chí đã cho
  Hotel.find({ city: area })
    .populate("rooms")
    .then((hotels) => {
      Transaction.find()
        .then((transactions) => {
          // Tìm các khách sạn có số lượng người và số lượng phòng phù hợp
          hotels.filter((hotel) => {
            return hotel.rooms.filter((room) => {
              return (
                room.maxPeople >= peopleNum &&
                room.roomNumbers.length >= roomNum
              );
            });
          });

          transactions.forEach((transaction) => {
            let dateStart1 = new Date(transaction.dateStart);
            let dateEnd1 = new Date(transaction.dateEnd);

            for (let i = 0; i < hotels.length; i++) {
              for (let j = 0; j < hotels[i].rooms.length; j++) {
                hotels[i].rooms[j].roomNumbers.forEach((roomNumber) => {
                  transaction.room.forEach((room) => {
                    if (
                      (room === roomNumber && dateEnd1 < dateStart2) ||
                      dateStart1 > dateEnd2
                    ) {
                      hotels.splice(i, 1);
                    }
                  });
                });
              }
            }
          });

          return res.status(200).json(hotels);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
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
