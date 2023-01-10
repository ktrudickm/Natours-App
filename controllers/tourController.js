// const fs = require("fs");
const Tour = require("./../models/tourModel");

// JSON.parse converts the json into a Javascript array of objects
// commented out because now we are using a database instead of static file
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// middleware for checking if the id is valid
// commented out because MongoDB gives unique ID's to entries
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour ID is: ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.price || !req.body.price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Missing name or price",
//     });
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    // results: tours.length, // tours is an array with multiple objects
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // req.params is grabbing the :id
  console.log(req.params);
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invaid data sent.",
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

exports.deleteTour = (req, res) => {
  // send back null for data when doing a deletion, with 204 error code
  res.status(204).json({
    status: "success",
    data: null,
  });
};
