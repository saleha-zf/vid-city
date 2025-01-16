import { Router } from "express";
import { login, register } from "../controller/userController.js";

const router = Router();

// Registration endpoint
router.post("/register", register)

// Login endpoint
router.post("/login", login)

export default router;