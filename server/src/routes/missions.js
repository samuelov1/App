import express from "express";
import { getAllMissions } from "../controllers/missions";

const router = express.Router();

router.get("/", getAllMissions);

export default router;
