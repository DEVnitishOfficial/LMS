
import { Router } from "express";
import { getProfile, logOut, login, register } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/authMiddleWare.js";
import upload from "../middleware/multerMiddleWare.js";

const router = Router()

router.post('/register', upload.single('avatar'), register)
router.post('/login',login)
router.get('/logout',logOut)
router.get('/me', isLoggedIn, getProfile)

export default router