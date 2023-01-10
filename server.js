const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

/////////////////////////////////////////////////////////////////////////

// MONGOOSE - Object Data Modeling library for MongoDB and Node.js, a higher level of abstraction.
// Allows for rapid and simple development of mongoDB database interactions
// Features: schemas to model data and relationships, easy data validation, simple query API, middleware, etc
// Mongoose schema: where we model our data, by describing structure of data, default values, and validation
// Mongoose model: a wrapper for the schema, providing an interface to the database for CRUD operations

/////////////////////////////////////////////////////////////////////////
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connection Successful"));

// Creating a mongoose schema for tours:
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
})

// Creating a mongoose model out of the above tours schema:
const Tour = mongoose.model('Tour', tourSchema);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}...`);
});
