import express from "express"

import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAddresses,addHome, addFamily, addOffice, addFavour ,addRecent, removeRecent} from "../controllers/address.controller.js";
const router = express.Router();

router.get("/get-addresses",protectedRoute,getAddresses);
router.post("/add-home",protectedRoute,addHome)
router.post("/add-family",protectedRoute,addFamily)
router.post("/add-office",protectedRoute,addOffice)
router.post("/add-favour",protectedRoute,addFavour)
router.post("/add-recent",protectedRoute,addRecent)
router.post("/remove-recent",protectedRoute,removeRecent)

export default router;