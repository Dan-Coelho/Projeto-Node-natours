const Tour = require('./../models/tour.Model');

//const tours = JSON.parse(
// fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
//);
//param middleware
/*exports.checkId = (req, res, next, value) => {
  console.log(`Tour id is ${value}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};
*/
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price!',
    });
  }
  next();
};
//2 ROUTES HANDLES
//Roteamento para solicitação GET dos passeios
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    /*results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },*/
  });
};

//Roteamento para solicitação de um passeio
//Implementação de parametro na URL :id
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  /*const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });*/
};

//Roteamento para solicitação POST que cria um novo passeio
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    /*data: {
      tour: newTour,
    },*/
  });
};

//Roteamento para solicitação patch
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour...>',
    },
  });
};

//Roteamento para solicitação delete
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
