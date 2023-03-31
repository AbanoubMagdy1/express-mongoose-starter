import {Router} from "express";
import login from "../controllers/userControllers/login.js";
import register from "../controllers/userControllers/register.js";
import getProfile from '../controllers/userControllers/getProfile.js'
import isAuth from '../middleware/isAuth.js'
import './userPolicy.js'

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", isAuth, getProfile);

export default router;