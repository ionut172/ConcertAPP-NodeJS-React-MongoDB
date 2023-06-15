const express = require("express");
const app = express();
const db = require("./db/connect");
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
const route = require("./routes/route");
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/site", route);

app.get("*", (req, res) => {
  res.status(404).send("<h1>Status 404. Page not found.</h1>");
});

const start = async () => {
  try {
    await db(
      "mongodb+srv://ionut172:na8kRDHik3x5QAZO@cluster0.czlqk9r.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port 3999");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
