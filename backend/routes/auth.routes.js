import express from "express";
import {
  login,
  logout,
  signup,
  registerDoctor,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/register", registerDoctor);

export default router;
