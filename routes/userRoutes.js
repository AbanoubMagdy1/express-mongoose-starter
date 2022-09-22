import {Router} from "express";
import asyncHandler from "express-async-handler";
import { login, register } from "../controllers/userControllers";

const router = Router();

router.get("/login", asyncHandler(login));
router.get("/register", asyncHandler(register));

export default router;