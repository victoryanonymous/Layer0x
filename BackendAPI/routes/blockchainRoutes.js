const express = require("express");
const router = express.Router();
const Blockchain = require("../models/Blockchain");

const axios = require("axios");

//Status endpoint to know status of all blockchains..
router.get("/status", async (req, res) => {
  try {
    const blockchains = await Blockchain.find();
    const statusInfo = await Promise.all(
      blockchains.map(async (blockchain) => {
        try {
          
          const response = await axios.get(`${blockchain.rpcUrl}/status`);
          //console.log(response);
          //console.log(response.data.result);
          const { latest_block_height } = response.data.result.sync_info;
          return {
            name: blockchain.name,
            status: "active",
            height: latest_block_height,
          };
        } catch (error) {
          return {
            name: blockchain.name,
            status: "inactive",
            height: 0,
          };
        }
      })
    );

    res.status(200).json({
      success: true,
      result: statusInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching status information",
    });
  }
});

//update endpoint..
router.put('/:id', async (req, res) => {
  const { name, chainID, rpcUrl, apiUrl } = req.body;

  console.log(req.body)
  
  try {
    const updatedBlockchain = await Blockchain.findByIdAndUpdate(
      req.params.id,
      { name, chainID, rpcUrl, apiUrl },
      { new: true }
    );

    if (!updatedBlockchain) {
      return res.status(404).json({ error: "Blockchain not found" });
    }

    res.status(200).json({ success: true, updatedBlockchain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all blockchains
router.get("/", async (req, res) => {
  try {
    const blockchains = await Blockchain.find();
    res.send(blockchains);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create a blockchain
router.post("/", async (req, res) => {
  try {
    const blockchain = new Blockchain(req.body);
    await blockchain.save();
    res.status(201).send(blockchain);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { name, chainID, rpcUrl, apiUrl } = req.body;
  console.log(req.body); // Uncomment for debugging

  try {
    const blockchain = await Blockchain.findById(req.params.id);

    if (!blockchain) {
      return res.status(404).json({ error: "Blockchain not found" });
    }

    blockchain.name = name || blockchain.name;
    blockchain.chainID = chainID || blockchain.chainID;
    blockchain.rpcUrl = rpcUrl || blockchain.rpcUrl;
    blockchain.apiUrl = apiUrl || blockchain.apiUrl;

    const updatedBlockchain = await blockchain.save();
    console.log(updatedBlockchain); // Uncomment for debugging

    res.status(200).json({ success: true, updatedBlockchain });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete a blockchain
router.delete("/:id", async (req, res) => {
  try {
    const blockchain = await Blockchain.findByIdAndDelete(req.params.id);

    if (!blockchain) {
      return res.status(404).send();
    }

    res.send(blockchain);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Monitor blockchain status
router.get("/monitor/:id", async (req, res) => {
  try {
    const blockchain = await Blockchain.findById(req.params.id);
    if (!blockchain) {
      return res.status(404).send();
    }
    //https://rpc.testnet.omniflix.network/status
    const response = await axios.get(`${blockchain.rpcUrl}/status`);
    console.log(response);
    const latestBlockHeight =
      response.data.result.sync_info.latest_block_height;
    //console.log(latestBlockHeight);

    res.send({
      blockchain: blockchain.name,
      status: "Active",
      latestBlockHeight,
    });
  } catch (error) {
    res.status(500).send({ status: "Inactive", error: error.message });
  }
});

// Update a blockchain
// router.patch("/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "rpcUrl"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   try {
//     const blockchain = await Blockchain.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!blockchain) {
//       return res.status(404).send();
//     }

//     res.send(blockchain);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

module.exports = router;
