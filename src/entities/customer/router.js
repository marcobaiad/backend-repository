import { Router } from "express";
import { createUser, getUser, getUsers } from "./repository/index.js";
const router = Router();

router.get("/cliente/:id?", getUser);
router.get("/clientes", getUsers);
router.post("/cliente", createUser);

export default router;
