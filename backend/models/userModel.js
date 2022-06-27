const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// DB schema
const usersSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "Password is too short (Minimum length is 8)"],
    required: [true, "Password is required"],
  },
});

// encrypting password before saving
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// verify password
usersSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

// get the token
usersSchema.methods.jwtGenerateToken = function () {
  return jwt.sign({ id: this.id }, `${process.env.JWT_SECRET}`, {
    expiresIn: 3600,
  });
};

// ModelDb table name
const Users = new mongoose.model("Users", usersSchema);

// const addUsers = new Users({

//   username: "Kitas",
//   email: "kitas@gmail.com",
//   password: "12345678n"

// });

// addUsers.save();


module.exports = Users;
