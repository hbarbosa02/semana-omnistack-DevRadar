const { Router } = require("express");

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.post("/devs/update/:github_username", DevController.update);
routes.delete("/devs/delete/:github_username", DevController.destroy);

routes.get("/search", SearchController.index);

module.exports = routes;
