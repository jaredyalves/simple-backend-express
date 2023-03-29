const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.username !== decoded.username) return res.sendStatus(403);

    const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
      { username: decoded.username, roles },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.json({ accessToken, roles });
  });
};

module.exports = { handleRefreshToken };
