import express from "express";
import validate from "../middleware/validate";
import {
  updateMissionSchema,
  insertMissionSchema
} from "../middleware/requestSchemas";
import {
  getAllMissions,
  updateMission,
  insertMission
} from "../controllers/missions";

const router = express.Router();

router.get("/", getAllMissions);
router.put("/", validate(updateMissionSchema), updateMission);
router.post("/", validate(insertMissionSchema), insertMission);

export default router;
