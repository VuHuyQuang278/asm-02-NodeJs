const User = require("../models/user");
const Transaction = require("../models/transaction");
const Hotel = require("../models/hotel");
const Room = require("../models/room");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
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
      const listTran = transactions.slice(-8);
      const orders = transactions.length;
      const earnings = transactions.reduce((acc, transaction) => {
        return acc + transaction.price;
      }, 0);
      User.find({ isAdmin: false })
        .then((users) => {
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
      const filterTran = transactions.filter(
        (transaction) => transaction.hotel.toString() === hotelId
      );

      if (filterTran.length > 0) {
        return res.status(200).json({
          message: "The hotel cannot be deleted",
        });
      } else {
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
