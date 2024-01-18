const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blockchainRoutes = require("./routes/blockchainRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/blockchains", blockchainRoutes);

mongoose
  .connect("mongodb://localhost:27017/blockchainsDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch(() => console.log("Connnection Error"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
