const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const blockchainsRouter = require("./routes/blockchains");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/blockchains", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch(() => console.log(error));

app.use(bodyParser.json());
app.use("/blockchains", blockchainsRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
