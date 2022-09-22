import {Router} from "express";
import login from "../controllers/userControllers/login.js";
import register from "../controllers/userControllers/register.js";

const router = Router();

router.get("/login", login);
router.get("/register", register);

export default router;