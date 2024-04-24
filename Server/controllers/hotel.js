const User = require("../models/user");

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
