
import { Router } from "express";
import { getProfile, logOut, login, register, forgotPassword, resetPassword, changePassword, updateUser} from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/authMiddleWare.js";
import upload from "../middleware/multerMiddleWare.js";

const router = Router()

router.post('/register', upload.single('avatar'), register)
router.post('/login',login)
router.get('/logout',logOut)
router.get('/me', isLoggedIn, getProfile)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:resetToken',resetPassword)
router.post('/changePassword',isLoggedIn,changePassword)
router.put('/update/:id',isLoggedIn,upload.single('avatar'), updateUser)

export default router