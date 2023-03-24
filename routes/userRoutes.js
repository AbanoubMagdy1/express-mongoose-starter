import {Router} from "express";
import login from "../controllers/userControllers/login.js";
import register from "../controllers/userControllers/register.js";
import getProfile from '../controllers/userControllers/getProfile.js'
import isAuth from '../middleware/isAuth.js'
import asyncHandler from 'express-async-handler'

const router = Router();

router.post("/login", asyncHandler(login));
router.post("/register", asyncHandler(register));
router.get("/profile", asyncHandler(isAuth), asyncHandler(getProfile));

export default router;