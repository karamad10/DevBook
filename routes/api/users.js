const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keyes = require("../../config/keys");
const passport = require("passport");

//load input validation
const validateRegisterinput = require("../../validation/register");
const validateLogininput = require("../../validation/login");

//load user module
const User = require("../../modules/User");

//@route    GET api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) =>
  res.json({
    message: "User is working"
  })
);
//@route    GET api/users/register
//@desc     register user
//@access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterinput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //finds a matching input
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    GET api/users/login
//@desc     login user / return JWT token
//@access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogininput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // create a jwt payload
        //user matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        //sign token with jwt
        jwt.sign(
          payload,
          keyes.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/users/current
//@desc     return current user
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);

module.exports = router;
