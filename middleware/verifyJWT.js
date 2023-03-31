const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) return res.sendStatus(401);

  const accessToken = authorization.split(" ")[1];
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    req.username = decoded.username;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = verifyJWT;
