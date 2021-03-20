import express from "express";
import validate from "../middleware/validate";
import {
  updateMissionSchema,
  insertMissionSchema,
  missionIdSchema
} from "../middleware/requestSchemas";
import {
  getAllMissions,
  updateMission,
  insertMission,
  deleteMission
} from "../controllers/missions";

const router = express.Router();

router.get("/", getAllMissions);
router.put("/", validate(updateMissionSchema), updateMission);
router.post("/", validate(insertMissionSchema), insertMission);
router.delete("/:id", validate(missionIdSchema), deleteMission);

export default router;
