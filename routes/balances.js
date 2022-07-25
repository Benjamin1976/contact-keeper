const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Balance = require("../models/Balance");

const returnDate = (dt) => {
  if (dt === null || dt === "") return dt;
  var delim = dt.match(/\D/);
  var dateps = dt.split(delim);
  return new Date(dateps[2] + "-" + dateps[1] + "-" + dateps[0]);
};

// @route   GET api/balances
// @desc    Get all users balances
// @access  Privates
router.get("/", auth, async (req, res) => {
  try {
    // Retrieve all balances for logged in user
    const balances = await Balance.find({ user: req.user.id }).sort({
      created: -1,
    });
    res.json(balances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/balances
// @desc    Add new balance
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("account", "Please add an account").not().isEmpty(),
      check("outstanding", "Please ensure numeric").isNumeric(),
      //   ,
      // check('email', 'Please include a valid email').isEmail()
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      status,
      period,
      bank,
      account,
      code,
      type,
      date_due,
      due,
      outstanding,
      minimum,
      available,
      rewards,
    } = req.body;

    try {
      // check if user exists
      let balance = await Balance.findOne({
        user: req.user.id,
        account: account,
        type: type,
        period: returnDate(period),
      });

      if (balance) {
        res.status(400).json({ msg: "Account already exists" });
      }

      balance = new Balance({
        user: req.user.id,
        status: status,
        period: returnDate(period),
        bank: bank,
        account: account,
        code: code,
        type: type,
        date_due: returnDate(date_due),
        due: due,
        outstanding: outstanding,
        minimum: minimum,
        available: available,
        rewards: rewards,
      });

      // save balance
      await balance.save();

      // How Brad did it but it doesn't check if same balance exists
      // Might be better as you could have same balance with a different number
      // const newBalance = new Balance({
      //   user: req.user.id,
      //   name: name,
      //   email: email,
      //   phone: phone,
      //   type: type
      // });

      // // save balance
      // const balance = await newBalance.save();

      res.json(balance);
    } catch (err) {
      console.error(err.message);
      console.log(returnDate(period));
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/balances/:id
// @desc    Update balance
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const {
    status,
    period,
    bank,
    account,
    code,
    type,
    date_due,
    due,
    outstanding,
    minimum,
    available,
    rewards,
  } = req.body;

  const balanceFields = {};

  if (status) balanceFields.status = status;
  if (period) balanceFields.period = returnDate(period);
  if (bank) balanceFields.bank = bank;
  if (account) balanceFields.account = account;
  if (code) balanceFields.code = code;
  if (type) balanceFields.type = type;
  if (date_due) balanceFields.date_due = returnDate(date_due);
  if (due) balanceFields.due = due;
  if (outstanding) balanceFields.outstanding = outstanding;
  if (minimum) balanceFields.minimum = minimum;
  if (available) balanceFields.available = available;
  if (rewards) balanceFields.rewards = rewards;

  try {
    let balance = await Balance.findById(req.params.id);

    if (!balance) {
      return res.status(404).json({ msg: "Balance does not exist" });
    }

    if (balance.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    balance = await Balance.findByIdAndUpdate(
      req.params.id,
      { $set: balanceFields },
      { new: true }
    );

    res.json(balance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/balance/:id
// @desc    Delete balance
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let balance = await Balance.findById(req.params.id);

    if (!balance) {
      return res.status(400).json({ msg: "Balance does not exist" });
    }

    if (balance.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    await Balance.findByIdAndRemove(req.params.id);

    res.json({ msg: "Balance Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
