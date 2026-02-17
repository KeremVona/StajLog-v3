import { Router } from "express";
import { getLogs, getLog, makeLog } from "src/controllers/log/logController";
import authorize from "../../middlewares/authorization";

const router = Router();

router.get("/", authorize, getLogs);
router.get("/:id", authorize, getLog);
router.post("/", authorize, makeLog);

export default router;
