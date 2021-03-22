import express from "express";
import validate from "../middleware/validate";
import {
  updateMissionSchema,
  insertMissionSchema,
  missionIdSchema,
  missionIdListSchema
} from "../middleware/requestSchemas";
import {
  getAllMissions,
  updateMission,
  insertMission,
  deleteMission,
  deleteMultipleMissions
} from "../controllers/missions";

const router = express.Router();

router.get("/", getAllMissions);
router.put("/", validate(updateMissionSchema), updateMission);
router.post("/", validate(insertMissionSchema), insertMission);
router.delete("/:id", validate(missionIdSchema), deleteMission);
router.delete("/", validate(missionIdListSchema), deleteMultipleMissions);

export default router;
