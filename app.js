const express = require("express");
const fs = require("fs");

const app = express();

//////////////////////////////////////////////////////////////////
//                MIDDLEWARES

// express.json() is middleware
// middleware is a function that can modify incoming request data (stands in the middle of the request and the response)
// without middleware, when sending POST request, will get a res of undefined
app.use(express.json());

// creating own middleware:
// want this to be gloablly before all other requests
// applies to every single request
app.use((req, res, next) => {
  console.log("Hello from the middleware!");
  // never forget to use next in middlewares
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////////////////////////////////////////////////////////////////

// JSON.parse converts the json into a Javascript array of objects
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length, // tours is an array with multiple objects
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  // req.params is grabbing the :id
  console.log(req.params);
  // converting id from string to number
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  // send back null for data when doing a deletion, with 204 error code
  res.status(204).json({
    status: "success",
    data: null,
  });
};

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// patch just return the updated portion, not the entire object like put does
// app.patch("/api/v1/tours/:id", updateTour);
// delete request
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Starts server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}...`);
});
