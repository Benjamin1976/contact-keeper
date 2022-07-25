const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Publics
router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email: email });

      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name: name,
        email: email,
        password: password,
      });

      // create encryption something
      const salt = await bcrypt.genSalt(10);

      // encrypt / hash password
      user.password = await bcrypt.hash(password, salt);

      // save user
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      const secret =
        process.env.ENV_NODE === "production"
          ? process.env.jwtSecret
          : config.get("jwtSecret");

      // Create jwtToken & return
      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
