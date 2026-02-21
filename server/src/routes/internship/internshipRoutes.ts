import { Router } from "express";
import authorize from "../../middlewares/authorization";
import {
  deleteInternship,
  getInternship,
  getInternships,
  makeInternship,
  updateInternship,
} from "../../controllers/internship/internshipController";

const router = Router();

router.get("/", authorize, getInternships);
router.get("/:id", authorize, getInternship);
router.post("/", authorize, makeInternship);
router.put("/:id", authorize, updateInternship);
router.delete("/:id", authorize, deleteInternship);

export default router;
