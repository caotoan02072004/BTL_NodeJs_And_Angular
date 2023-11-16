import express from "express";
const router = express.Router();
import dashboardController from "../controllers/dashboard.controller";
import auth from "../services/authentication.js";

let initDashboard = (app) => {
  router.get(
    "/getAccount",
    auth.authentication,
    dashboardController.getAccount
  );
  router.get(
    "/getProduct",
    auth.authentication,
    dashboardController.getProduct
  );
  router.delete(
    "/delete",
    auth.authentication,
    dashboardController.getProduct
  )

  return app.use("/favorite", router);
};

export default initDashboard;
