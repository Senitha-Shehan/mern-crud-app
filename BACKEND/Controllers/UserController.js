const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
  let users;
  //Get all users
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  //not found
  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }

  // Display all users
  return res.status(200).json({ users });
};

const addUsers = async (req, res, next) => {
  const { name, gmail, age, address } = req.body;

  let users;

  try {
    users = new User({ name, gmail, age, address });
    await users.save();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "Unable to add" });
  }
  return res.status(200).json({ users });
};

const getById = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

const updateById = async (req, res, next) => {
  const id = req.params.id;

  const { name, gmail, age, address } = req.body;

  let user;

  try {
    user = await User.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      age: age,
      address: address,
    });
    user = await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "Unable to update user details" });
  }
  return res.status(200).json({ user });
};

const deleteById = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "Unable to delete user" });
  }
  return res.status(200).json({ user });
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateById = updateById;
exports.deleteById = deleteById;
