const express = require("express");
const axios = require("axios");
const router = express.Router();
const Blockchain = require("../models/Blockchain");

// Function to fetch blockchain status using RPC
async function getBlockchainStatus(rpcURL) {
  try {
    const response = await axios.post(rpcURL, {
      jsonrpc: "2.0",
      method: "getblockchaininfo",
      id: 1,
    });
    console.log(response);

    if (response.data && response.data.result) {
      const { blocks } = response.data.result;
      return { status: "active", height: blocks };
    } else {
      return { status: "inactive", height: 0 };
    }
  } catch (error) {
    //console.error(error);
    return { status: "error", height: 0 };
  }
}

// Create a new blockchain
router.post("/", async (req, res) => {
  try {
    const blockchain = new Blockchain(req.body);
    await blockchain.save();
    console.log("Hello");
    // Fetch and update blockchain status
    const status = await getBlockchainStatus(blockchain.rpcURL);
    blockchain.status = status.status;
    blockchain.height = status.height;
    await blockchain.save();

    res.status(201).json({ success: true, result: blockchain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// router.get("/", async (req, res) => {
//   const blockchains = await Blockchain.find();
//   res.send(blockchains);
// });

//Get all blockchains
router.get("/", async (req, res) => {
  try {
    const blockchains = await Blockchain.find();
    //console.log("Hello");
    // Fetch and update status for each blockchain
    const updatedBlockchains = await Promise.all(
      blockchains.map(async (blockchain) => {
        const status = await getBlockchainStatus(blockchain.rpcURL);
        // console.log(status);
        blockchain.status = status.status;
        blockchain.height = status.height;
        await blockchain.save();
        return blockchain;
      })
    );

    res.json({ success: true, result: updatedBlockchains });
  } catch (error) {
    console.error(error);
    console.log("Hello");
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get a specific blockchain by ID
router.get("/:id", async (req, res) => {
  try {
    const blockchain = await Blockchain.findById(req.params.id);
    if (!blockchain) {
      return res
        .status(404)
        .json({ success: false, error: "Blockchain not found" });
    }

    // Fetch and update blockchain status
    const status = await getBlockchainStatus(blockchain.rpcURL);
    blockchain.status = status.status;
    blockchain.height = status.height;
    await blockchain.save();

    res.json({ success: true, result: blockchain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Update a specific blockchain by ID
router.put("/:id", async (req, res) => {
  try {
    const blockchain = await Blockchain.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!blockchain) {
      return res
        .status(404)
        .json({ success: false, error: "Blockchain not found" });
    }

    // Fetch and update blockchain status
    const status = await getBlockchainStatus(blockchain.rpcURL);
    blockchain.status = status.status;
    blockchain.height = status.height;
    await blockchain.save();

    res.json({ success: true, result: blockchain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Delete a specific blockchain by ID
router.delete("/:id", async (req, res) => {
  try {
    const blockchain = await Blockchain.findByIdAndDelete(req.params.id);
    if (!blockchain) {
      return res
        .status(404)
        .json({ success: false, error: "Blockchain not found" });
    }

    res.json({ success: true, result: "Blockchain deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
