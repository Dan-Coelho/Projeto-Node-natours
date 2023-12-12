const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const { dirname } = require('path');
const app = express();
//1-MIDDLEWARES
//Middleware morgan
app.use(morgan('tiny'));
//Criação de middleware do express
app.use(express.json());
//Definindo nosso middleware
app.use((req, res, next) => {
  console.log('-----------');
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3 ROUTES
//MOUTING ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
