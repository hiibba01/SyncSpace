import express from "express";
 import { createRoom } from "../controllers/room.Controller.js";
 import protect from "../middleware/auth.middleware.js";

 const router = express.Router();
 
 router.post("/create", protect, createRoom);

 export default router;