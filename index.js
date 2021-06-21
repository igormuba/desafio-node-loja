const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config();

//express
const app = express();
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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(productRouter);
app.use(userRouter);

app.listen(process.env.PORT || 3000, function () {
  console.log("listening on 3000");
});
