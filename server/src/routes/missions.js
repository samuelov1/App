import express from "express";
import validate from "../middleware/validate";
import { updateMissionSchema } from "../middleware/requestSchemas";
import { getAllMissions, updateMission } from "../controllers/missions";

const router = express.Router();

router.get("/", getAllMissions);
router.put("/", validate(updateMissionSchema), updateMission);

export default router;
