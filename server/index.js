const express = require("express");

const cors = require("cors");
// const { connection } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(4000, async () => {
  try {
    // await connection;
    console.log("Serveer connected to database");
  } catch (err) {
    console.log(err);
  }
  console.log("Server running at http://localhost:4000");
});
