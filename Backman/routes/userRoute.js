import express from 'express'
import { checkAuth, registerUser, loginUser, updateUser } from '../controllers/usercontroller.js'
import { protectedRoute } from '../middleware/auth.js'

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/updateprofile", protectedRoute, updateUser);
router.get("/check", protectedRoute, checkAuth);

export default router;