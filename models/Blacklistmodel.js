const mongoose = require("mongoose");
const blacklistUserSchema = mongoose.Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const BlacklistUserModel = mongoose.model("blacklistuser", blacklistUserSchema);
module.exports = { BlacklistUserModel };