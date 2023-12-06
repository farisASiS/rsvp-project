import express from "express";
import { createRsvp } from "../controllers/rsvp.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', createRsvp)

export default router;