const express = require('express');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const { dirname } = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const router = require('./routes/userRoutes');

const app = express();
//1- GLOBAL MIDDLEWARES
//Set security http headers
app.use(helmet());
//Development loggin //Middleware morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Limit request from same Ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour',
});
app.use('/api', limiter);
//Criação de middleware do express
//Body parser - reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against noSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS.
app.use(xss());
//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);
//Serving static files
app.use(express.static(`${__dirname}/public`));
//Definindo nosso middleware
// app.use((req, res, next) => {
//   console.log('-----------');
//   console.log('Hello from the middleware');
//   next();
// });

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3 ROUTES
//MOUTING ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', router);

//route for paths which don't exist
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
