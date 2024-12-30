import express from "express";
import { saveLocation,getLocation } from "../controllers/location.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/save-location",protectedRoute,saveLocation);
router.get("/get-location",protectedRoute,getLocation)

export default router;