const config = require("../../config/AuthConfig");
const db = require("../../app/models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  signup(req, res, next) {
    User.findOne({
      username: req.body.username,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res
          .status(400)
          .send({ message: "Failed! Your email is already in use!" });
        return;
      }
       else {
        const { username, password, fullName, phone, address, statusActive } =
          req.body || {};
        const codeActive = Math.floor(Math.random() * 900000) + 100000;

        const user = new User({
          username: username,
          password: bcrypt.hashSync(password, 8),
          fullName,
          phone,
          address,
          codeActive,
          statusActive, // 0 is not active, 1 is active
        });

        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (req.body.roles) {
            Role.find(
              {
                name: { $in: req.body.roles },
              },
              (err, roles) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                user.roles = roles.map((role) => role._id);
                user.save((err) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }

                  res.send({
                    retCode: 0,
                    retText: "User was registered successfully!",
                    retData: {
                      userId: user._id,
                    },
                  });
                });
              }
            );
          } else {
            Role.findOne({ name: "user" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              user.roles = [role._id];
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                res.send({
                  retCode: 0,
                  retText: "User was registered successfully!",
                  retData: {
                    userId: user._id,
                  },
                });
              });
            });
          }
        });
      }
    });
  }

  signin(req, res, next) {
    User.findOne({
      username: req.body.username,
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        } else {
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!",
            });
          }

          var token = jwt.sign({ id: user.id }, config.secret, {
            // expiresIn: 86400, // 24 hours // không càn set time expired cho token
          });

          var authorities = [];

          for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
          }
          res.status(200).send({
            retCode: 0,
            retText: "Login successfully!",
            retData: {
              id: user._id,
              username: user.username,
              fullName: user.fullName,
              phone: user.phone,
              address: user.address,
              roles: authorities,
              accessToken: token,
            },
          });
        }
      });
  }

  async confirmActiveCode(req, res, next) {
    const { code, userId } = req.body || {};

    const userDetail = await User.findOne({ _id: userId }).exec();
    if (!!userDetail) {
      if (userDetail.codeActive === code) {
        userDetail.set({ statusActive: 1 });
        await userDetail.save();
        res.json({
          retCode: 0,
          retText: "Successfully active account",
          retData: null,
        });
      } else {
        res.status(400).send({ message: "Code active is not correct!" });
        return;
      }
    } else {
      res.status(400).send({ message: "User not found!" });
      return;
    }
    // res.json(userDetail);

    // User.findOne({ _id: userId }).exec(async (err, user) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   } else {
    //     if (user) {
    //       if (user.codeActive === code) {
    //         user.set({ statusActive: 1 });
    //         await user.save();
    //         res.json({
    //           retCode: 0,
    //           retText: "Successfully active account",
    //           retData: null,
    //         });
    //       } else {
    //       }
    //     } else {
    //       res.status(400).send({ message: "User not found!" });
    //       return;
    //     }
    //   }
    // });
  }
}

module.exports = new AuthController();
