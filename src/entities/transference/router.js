import { Router } from "express";
import { getTransferences, createTransference } from "./repository/index.js";
const router = Router();

router.get("/transferencias", getTransferences);
router.get("/transferencia/:userId?", getTransferences);
router.post("/transferencia", createTransference);

export default router;
