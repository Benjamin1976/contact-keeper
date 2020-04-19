const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Account = require('../models/Account');

// @route   GET api/accounts
// @desc    Get all users accounts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Retrieve all accounts for logged in user
    const accounts = await Account.find({ user: req.user.id }).sort({
      created: -1
    });
    res.json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/accounts
// @desc    Add new account
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('code', 'Please add an account code')
        .not()
        .isEmpty()
      //   ,
      // check('outstanding', 'Please ensure numeric').isNumeric()
      //   ,
      // check('email', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { code, country, country_code, bank, name, type, active } = req.body;

    try {
      // check if account exists
      let account = await Account.findOne({
        user: req.user.id,
        code: code
      });

      if (account) {
        res.status(400).json({ msg: 'Account already exists' });
      }

      account = new Account({
        user: req.user.id,
        code: code,
        country: country,
        country_code: country_code,
        bank: bank,
        name: name,
        type: type,
        active: active
      });

      // save account
      await account.save();

      res.json(account);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/accounts/:id
// @desc    Update account
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { code, country, country_code, bank, name, type, active } = req.body;

  const accountFields = {};

  if (code) accountFields.code = code;
  if (country) accountFields.country = country;
  if (country_code) accountFields.country_code = country_code;
  if (bank) accountFields.bank = bank;
  if (name) accountFields.name = name;
  if (type) accountFields.type = type;
  if (active) accountFields.active = active;

  try {
    let account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ msg: 'Account does not exist' });
    }

    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorised' });
    }

    account = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: accountFields },
      { new: true }
    );

    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/account/:id
// @desc    Delete account
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(400).json({ msg: 'Account does not exist' });
    }

    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorised' });
    }

    await Account.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Account Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
