const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFERSH_TOKEN_KEY;
const { BlacklistUserModel } = require("../models/Blacklistmodel");
async function auth(req, res, next) {
  const { accessToken, refreshToken } = req.cookies;
  console.log(accessToken, refreshToken);
  try {
    const blacklist = await BlacklistUserModel.findOne({ token: accessToken });
    if (blacklist) {
      return res.status(400).send({ msg: `Please Login Again` });
    } else {
      jwt.verify(accessToken, accessTokenKey, function (err, decoded) {
        if (decoded) {
          next();
        } else {
          jwt.verify(refreshToken, refreshTokenKey, function (err, decoded) {
            if (decoded) {
              var newToken = jwt.sign(
                { name: decoded.name, userId: decoded.userId },
                accessTokenKey,
                {
                  expiresIn: "1h",
                  httpOnly: true,
                  sameSite: "none",
                  secure: true,
                }
              );
              res.cookie("accessToken", newToken);
              console.log(newToken);
              next();
            } else {
              res.status(400).send({ msg: `Please Login Again...` });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
}
module.exports = { auth };









