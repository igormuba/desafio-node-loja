const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

require("dotenv").config();

//express

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//mongodb
const uri = process.env.MONGODBURI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//serve compiled react
app.use(express.static("public"));

app.get("/api", (req, res) => {
  console.log();
  res.send("Hello World");
});

app.use("/api", productRouter);
app.use("/api", userRouter);

app.listen(process.env.PORT || 3000, function () {
  console.log(`listening on ${process.env.PORT}`);
});
