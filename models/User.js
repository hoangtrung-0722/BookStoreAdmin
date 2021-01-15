const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  address: String,
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(passportLocalMongoose, {
  errorMessages: {
    UserExistsError: "Username already exists",
  },
});

module.exports = mongoose.model("User", userSchema);
