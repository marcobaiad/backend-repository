import { Router } from "express";
import { getTransferences, createTransference } from "./repository/index.js";
const router = Router();

router.get("/", getTransferences);
router.post("/", createTransference);
router.use("/transferencias", router);

export default router;
