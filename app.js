// This app.js file contains all thigns pertaining to Express.js

const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//////////////////////////////////////////////////////////////////
// 1) MIDDLEWARES
// middleware is a function that can modify incoming request data (stands in the middle of the request and the response)

if (process.env.NODE_ENV === "development") {
  // Morgan is an HTTP request logger
  app.use(morgan("dev"));
}

// express.json() is middleware
// without this middleware, when sending POST request, will get a res of undefined
app.use(express.json());

// middleware for serving static files
app.use(express.static(`${__dirname}/public`));

// creating own middleware:
// want this to be gloablly before all other requests
// applies to every single request
app.use((req, res, next) => {
  console.log("Hello from the middleware!");
  next(); // never forget to use next in middlewares
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/////////////////////////////////////////////////////////////
// 3) ROUTES

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//////////////////////////////////////////////////////////////
// 4) Start server

module.exports = app;
