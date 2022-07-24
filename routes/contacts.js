const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Privates
router.get("/", auth, async (req, res) => {
  try {
    // Retrieve all contacts for logged in user
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please add a name").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      // check if user exists
      let contact = await Contact.findOne({
        user: req.user.id,
        name: name,
        email: email,
        phone: phone,
      });

      if (contact) {
        res.status(400).json({ msg: "Contact already exists" });
      }

      contact = new Contact({
        user: req.user.id,
        name: name,
        email: email,
        phone: phone,
        type: type,
      });

      // save contact
      await contact.save();

      // How Brad did it but it doesn't check if same contact exists
      // Might be better as you could have same contact with a different number
      // const newContact = new Contact({
      //   user: req.user.id,
      //   name: name,
      //   email: email,
      //   phone: phone,
      //   type: type
      // });

      // // save contact
      // const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact does not exist" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(400).json({ msg: "Contact does not exist" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
