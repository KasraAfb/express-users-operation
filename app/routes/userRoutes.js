import express from "express";
const router = express.Router();

import {
  registerUser,
  updateUser,
  findUsersByRole,
  deleteUser,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.patch("/", updateUser);
router.delete("/remove/:id", deleteUser);
router.get("/find/by-role", findUsersByRole);

export default router;
