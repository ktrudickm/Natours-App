const express = require("express");
const fs = require("fs");

const app = express();

// express.json() is middleware
// middleware is a function that can modify incoming request data (stands in the middle of the request and the response)
// without middleware, when sending POST request, will get a res of undefined
app.use(express.json());

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

app.get("/api/v1/tours/:id", (req, res) => {
  // req.params is grabbing the :id
  console.log(req.params);
  // converting id from string to number
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  // OR (another method is if you put if statement after you assign tour after using find() below):
  const tour = tours.find((el) => el.id === id);
  //   if (!tour) {
  //     return res.status(404).json({
  //       status: "fail",
  //       message: "Invalid ID",
  //     });
  //   }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// req holds all data
app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// patch just return the updated portion, not the entire object like put does
app.patch("/api/v1/tours/:id", (req, res) => {

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
});

// Starts server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}...`);
});
