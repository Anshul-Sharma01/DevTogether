import { Router } from "express";
import { checkServerHealth } from "../controllers/serverCheck.controllers";

const router = Router();

router.get("/fetch").get(checkServerHealth);

export default router;


