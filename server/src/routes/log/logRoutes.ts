import { Router } from "express";
import {
  getLogs,
  getLog,
  makeLog,
  updateLog,
  deleteLog,
} from "src/controllers/log/logController";
import authorize from "../../middlewares/authorization";

const router = Router();

router.get("/", authorize, getLogs);
router.get("/:id", authorize, getLog);
router.post("/", authorize, makeLog);
router.put("/:id", authorize, updateLog);
router.delete("/:id", authorize, deleteLog);

export default router;
