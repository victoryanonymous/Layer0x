const mongoose = require("mongoose");

const blockchainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  chainID: { type: String, required: true },
  apiURL: { type: String, required: true },
  rpcURL: { type: String, required: true },
  status: { type: String, default: "unknown" },
  height: { type: Number, default: 0 },
});

module.exports = mongoose.model("Blockchain", blockchainSchema);
