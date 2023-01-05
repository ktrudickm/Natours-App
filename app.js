const express = require("express");
const fs = require("fs");

const app = express();

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server side!", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint...");
// });
// JSON.parse converts the json into a Javascript array of objects
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// route handler: (req, res)
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length, // tours is an array with multiple objects
    data: {
      tours,
    },
  });
});

// Starts server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}...`);
});
