const fs = require("fs");

// JSON.parse converts the json into a Javascript array of objects
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
  
exports.getAllTours = (req, res) => {
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
  
  exports.getTour = (req, res) => {
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
  
  exports.createTour = (req, res) => {
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
  
  exports.updateTour = (req, res) => {
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
  
  exports.deleteTour = (req, res) => {
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