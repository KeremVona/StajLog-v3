import express from "express";
import validInfo from "src/middlewares/validInfo";
import authorize from "src/middlewares/authorization";
import {
  registerHandler,
  loginHandler,
  verifyHandler,
  getUserIdHandler,
} from "src/controllers/authentication/userController";

const router = express.Router();

router.post("/register", validInfo, registerHandler);
router.post("/login", validInfo, loginHandler);
router.post("/verify", authorize, verifyHandler);
router.post("/user-id", authorize, getUserIdHandler);

export default router;
