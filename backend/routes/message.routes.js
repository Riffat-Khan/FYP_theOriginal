import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

import isAuthorizedUser from "../middlewares/isAuthorizedUser.js";

const router = express.Router();

router.post("/send/:id", isAuthorizedUser(["user", "care-taker"]), sendMessage);

router.get("/:id", isAuthorizedUser(["user", "care-taker"]), getMessages);

export default router;
