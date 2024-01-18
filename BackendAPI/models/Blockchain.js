const mongoose = require("mongoose");

const blockchainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  chainID: { type: String, required: true },
  rpcUrl: { type: String, required: true },
  apiUrl: { type: String, required: true },
});

const Blockchain = mongoose.model("Blockchain", blockchainSchema);

module.exports = Blockchain;
