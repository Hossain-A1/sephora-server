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

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
