import {Router} from "express";
import login from "../controllers/userControllers/login.js";
import register from "../controllers/userControllers/register.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;