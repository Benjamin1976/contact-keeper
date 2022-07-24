const mongoose = require("mongoose");
const config = require("config");
//const db = config.get('mongoURI_online');
// const db = config.get("mongoURI_local");

let db =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : // ? config.get("mongoURI_online")
      config.get("mongoURI_local");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  //   mongoose
  //     .connect(db, {
  //       useNewUrlParser: true,
  //       useCreateIndex: true,
  //       useFindAndModify: false
  //     })
  //     .then(() => console.log('MongoDB Connected'))
  //     .catch(err => {
  //       console.error(err.message);
  //       process.exit(1);
  //     });
};

module.exports = connectDB;
