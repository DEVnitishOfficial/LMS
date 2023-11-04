
import { Router } from "express";
import { getProfile, logOut, login, register } from "../controllers/userController";

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logOut)
router.get('/me',getProfile)

export default router