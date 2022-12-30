const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/users");
const { cntrlWrapper, HttpError } = require("../helpers");

require("dotenv").config();
const secret = process.env.SECRET_KEY;
const AVATAR_SIZE_PX = 250;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
  });
  const id = newUser._id;
  const token = jwt.sign({ id }, secret, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.status(201).json({
    token,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarUrl: newUser.avatarUrl,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const compareResult = await bcrypt.compare(password, user.password);

  if (!compareResult) {
    throw HttpError(401, "Email or password is wrong");
  }

  const id = user._id;
  const token = jwt.sign({ id }, secret, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarUrl: user.avatarUrl,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).end();
};

const getCurrentUser = (req, res) => {
  const { email, subscription, avatarUrl } = req.user;
  res.json({ user: { email, subscription, avatarUrl } });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { originalname, path: tempUpload } = req.file;
  const { _id } = req.user;
  const avatarName = `${_id}_${originalname}`;
  const avatarsDir = path.join(__dirname, "../", "public", "avatars");
  const avatarsUpload = path.join(avatarsDir, avatarName);

  const avatar = await Jimp.read(tempUpload);
  avatar.resize(AVATAR_SIZE_PX, AVATAR_SIZE_PX).write(avatarsUpload);
  await fs.unlink(tempUpload);

  const avatarUrl = path.join("avatars", avatarName);
  const user = await User.findByIdAndUpdate(_id, { avatarUrl }, { new: true });
  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarUrl: user.avatarUrl,
    },
  });
};

module.exports = {
  register: cntrlWrapper(register),
  login: cntrlWrapper(login),
  logout: cntrlWrapper(logout),
  getCurrentUser,
  updateSubscription: cntrlWrapper(updateSubscription),
  updateAvatar: cntrlWrapper(updateAvatar),
};
