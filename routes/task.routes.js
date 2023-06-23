const { authJwt } = require("../middlewares");
const controller = require("../controllers/task.controller");

module.exports = function(app) {
  app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/task', [authJwt.verifyToken], controller.getTasks)
  app.get('/api/task/:id', [authJwt.verifyToken], controller.getTaskById)
  app.post('/api/task/:parentId', [authJwt.verifyToken], controller.addItem)
  app.path('/api/task/:id', [authJwt.verifyToken], controller.updateItem)
  app.delete('/api/task/:id', [authJwt.verifyToken], controller.deleteItem)
}