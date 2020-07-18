const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add(
	"productcategorydetail",
	"/productcategorydetail/:id",
	"productcategorydetail"
);
