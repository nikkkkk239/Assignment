import express from "express"
import { signUp ,login,checkAuth} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup",signUp)
router.post('/login',login)
router.get('/checkAuth',protectedRoute,checkAuth)

export default router;