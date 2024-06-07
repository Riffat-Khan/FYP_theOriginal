import express from "express";

import {
  acceptService,
  createService,
  updateService,
  getAllServices,
  getUserServices,
} from "../controllers/service.controller.js";

import isAuthorizedUser from "../middlewares/isAuthorizedUser.js";

const router = express.Router();

router.get("/", isAuthorizedUser(["user"]), getUserServices);

router.get("/all", isAuthorizedUser(["care-taker"]), getAllServices);

router.post("/create", isAuthorizedUser(["user"]), createService);

router.put(
  "/accept/:serviceID",
  isAuthorizedUser(["care-taker"]),
  acceptService
);

router.put("/update/:serviceID", isAuthorizedUser(["user"]), updateService);

export default router;
