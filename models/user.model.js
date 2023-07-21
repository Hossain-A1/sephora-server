const mongoose = require("mongoose");
const validator = require("validator");
const bctypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    ocupation: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user","seller","admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//signup user
userSchema.statics.signup = async function (
  name,
  email,
  password,
  address,
  ocupation
) {
  if (!name || !email || !password || !address || !ocupation) {
    throw Error("All feilds must be filled.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Invalid password. Must contain at least one number, one uppercase letter, one lowercase letter, and one symbol"
    );
  }

  const salt = await bctypt.genSalt(10);
  const hasPass = await bctypt.hash(password, salt);

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already used!");
  }

  const user = await this.create({
    name,
    email,
    password: hasPass,
    address,
    ocupation,
  });

  

  return user;
};

// login user

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All feilds must be filled.");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email or password.");
  }

  const match = await bctypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect email or password.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
