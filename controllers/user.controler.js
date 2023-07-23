const { genToken } = require("../helpers/token.helper");
const User = require("../models/user.model");
// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, image, address, ocupation } = req.body;

    const user = await User.signup(
      name,
      email,
      password,
      image,
      address,
      ocupation
    );
    // create token here
    const token = genToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    //  create token here
    const token = genToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//get all users

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
