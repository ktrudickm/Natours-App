const mongoose = require("mongoose");

// Creating a mongoose schema for tours:
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
  });
  
  // Creating a mongoose model out of the above tours schema:
  const Tour = mongoose.model("Tour", tourSchema);

  module.exports = Tour;