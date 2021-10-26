import express from "express";
import test_router from "./test_route_one";
const routes = express.Router();

routes.use("/test", test_router);

export default routes;
