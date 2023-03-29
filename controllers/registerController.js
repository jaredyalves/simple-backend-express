const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  if (await User.findOne({ username }).exec()) return res.sendStatus(409);

  try {
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hash,
    });

    res.status(201).json({ success: `New user ${username} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
