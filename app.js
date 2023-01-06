const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//////////////////////////////////////////////////////////////////
// 1) MIDDLEWARES
// middleware is a function that can modify incoming request data (stands in the middle of the request and the response)

// Morgan is an HTP request logger
app.use(morgan("dev"));

// express.json() is middleware
// without this middleware, when sending POST request, will get a res of undefined
app.use(express.json());

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}...`);
});
