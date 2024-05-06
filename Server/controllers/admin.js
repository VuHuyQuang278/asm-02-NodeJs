const User = require("../models/user");
const Transaction = require("../models/transaction");

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
