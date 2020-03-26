const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Balance = require('../models/Balance');

// @route   GET api/balances
// @desc    Get all users balances
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Retrieve all balances for logged in user
    const balances = await Balance.find({ user: req.user.id }).sort({
      created: -1
    });
    res.json(balances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/balances
// @desc    Add new balance
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('account', 'Please add an account')
        .not()
        .isEmpty(),
      check('outstanding', 'Please ensure numerice').isNumeric()
      //   ,
      // check('email', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { account, type, period, outstanding } = req.body;

    try {
      // check if user exists
      let balance = await Balance.findOne({
        user: req.user.id,
        account: account,
        type: type,
        period: period
      });

      if (balance) {
        res.status(400).json({ msg: 'Account already exists' });
      }

      balance = new Balance({
        user: req.user.id,
        account: account,
        type: type,
        period: period,
        outstanding: outstanding
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
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/balances/:id
// @desc    Update balance
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { account, type, period, outstanding } = req.body;

  const balanceFields = {};
  if (account) balanceFields.account = account;
  if (type) balanceFields.type = type;
  if (period) balanceFields.period = period;
  if (outstanding) balanceFields.outstanding = outstanding;

  try {
    let balance = await Balance.findById(req.params.id);

    if (!balance) {
      return res.status(404).json({ msg: 'Balance does not exist' });
    }

    if (balance.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorised' });
    }

    balance = await Balance.findByIdAndUpdate(
      req.params.id,
      { $set: balanceFields },
      { new: true }
    );

    res.json(balance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/balance/:id
// @desc    Delete balance
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let balance = await Balance.findById(req.params.id);

    if (!balance) {
      return res.status(400).json({ msg: 'Balance does not exist' });
    }

    if (balance.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorised' });
    }

    await Balance.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Balance Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
