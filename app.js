const express = require('express');
const morgan = require('morgan');
const { dirname } = require('path');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//1-MIDDLEWARES
//Middleware morgan
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Criação de middleware do express
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//Definindo nosso middleware
// app.use((req, res, next) => {
//   console.log('-----------');
//   console.log('Hello from the middleware');
//   next();
// });
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3 ROUTES
//MOUTING ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//route for paths which don't exist
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
