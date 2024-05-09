const User = require("../models/user");
const Transaction = require("../models/transaction");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const transaction = require("../models/transaction");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Xác thực tài khoàn đăng nhập
  User.findOne({ email: email })
    .then((user) => {
      // Kiểm tra tài khoản đăng nhập có phải admin không
      if (user.password === password && user.isAdmin) {
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

exports.getDataAdminPage = (req, res, next) => {
  Transaction.find()
    .populate("user")
    .populate("hotel")
    .then((transactions) => {
      // Lấy ra 8 giao dịch gần nhất
      const listTran = transactions.slice(-8);
      // Lấy tổng số giao dịch
      const orders = transactions.length;
      // Lấy tổng doanh thu
      const earnings = transactions.reduce((acc, transaction) => {
        return acc + transaction.price;
      }, 0);

      User.find({ isAdmin: false })
        .then((users) => {
          // Lấy số người dùng
          const totalUser = users.length;

          return res.status(200).json({
            listTran,
            orders,
            earnings,
            totalUser,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getListHotel = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      return res.status(200).json(hotels);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;

  Transaction.find()
    .then((transactions) => {
      // Kiểm tra khách sạn muốn xóa có nằm trong giao dịch nào không
      const filterTran = transactions.filter(
        (transaction) => transaction.hotel.toString() === hotelId
      );

      // Nếu có thì thông báo không xóa được khách sạn
      if (filterTran.length > 0) {
        return res.status(200).json({
          message: "The hotel cannot be deleted",
        });
      } else {
        // Nếu không thì xóa khách sạn
        Hotel.findByIdAndDelete(hotelId)
          .then(() => {
            return res.status(200).json({
              message: "Detele hotel compelete!",
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

exports.postAddHotel = (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const city = req.body.city;
  const address = req.body.address;
  const distance = req.body.distance;
  const title = req.body.title;
  const desc = req.body.desc;
  const cheapestPrice = req.body.cheapestPrice;
  const rating = req.body.rating;
  const photos = req.body.photos;
  const featured = req.body.featured;
  const rooms = req.body.rooms;

  const hotel = new Hotel({
    name,
    type,
    city,
    address,
    distance,
    title,
    photos,
    desc,
    cheapestPrice,
    rating,
    featured,
    rooms,
  });

  hotel
    .save()
    .then(() => {
      return res.status(200).json({
        message: "Created Hotel!",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddHotel = (req, res, next) => {
  Room.find()
    .then((rooms) => {
      return res.status(200).json(rooms);
    })
    .catch((err) => console.log(err));
};

exports.getListRoom = (req, res, next) => {
  Room.find()
    .then((rooms) => {
      return res.status(200).json(rooms);
    })
    .catch((err) => console.log(err));
};

exports.postAddRoom = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const maxPeople = req.body.maxPeople;
  const desc = req.body.desc;
  const roomNumbers = req.body.roomNumbers;

  const room = new Room({
    title,
    price,
    maxPeople,
    desc,
    roomNumbers,
  });

  room
    .save()
    .then(() => {
      return res.status(200).json({
        message: "Created Room!",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteRoom = (req, res, next) => {
  const roomId = req.body.roomId;

  Room.findById(roomId)
    .exec()
    .then((room) => {
      Transaction.find()
        .then((transactions) => {
          let isDelete = true;

          // Kiểm tra các phòng trong danh sách transaction có bị trùng với các phòng của room định xóa hay không
          transactions.forEach((transaction) => {
            transaction.room.forEach((roomNum) => {
              const roomNumber = parseInt(roomNum);
              if (room.roomNumbers.includes(roomNumber)) {
                isDelete = false;
                return;
              }
            });
          });

          // Nếu không bị trùng thì xóa room
          if (isDelete) {
            Room.findByIdAndDelete(roomId)
              .then(() => {
                return res.status(200).json({
                  message: "Detele room compelete!",
                });
              })
              .catch((err) => console.log(err));
          } else {
            return res.status(200).json({
              message: "The room cannot be deleted",
            });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
