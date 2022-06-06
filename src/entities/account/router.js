import { Router } from "express";
import { getAccount, getAccounts, createAccount } from "./repository/index.js";

const router = Router();

router.get("/cuenta/:id?", getAccount);
router.post("/cuenta", createAccount);
router.get("/cuentas", getAccounts);

export default router;
