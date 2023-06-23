const { authJwt } = require("../middlewares");
const controller = require("../controllers/lists.controller");

module.exports = function(app) {
  app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/lists', [authJwt.verifyToken], controller.getLists);
  app.get('/api/lists/:id', [authJwt.verifyToken], controller.getListById);
  app.post('/api/lists/', [authJwt.verifyToken], controller.addNewItem);
  app.patch('/api/lists/:id', [authJwt.verifyToken], controller.updateItem);
  app.delete('/api/lists/:id', [authJwt.verifyToken], controller.deleteItem);
}