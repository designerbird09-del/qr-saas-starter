import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  createQr, listQr, getQr, updateQr, deleteQr, duplicateQr, renderQr,
} from "../controllers/qr.controller";

const router = Router();

router.use(requireAuth);

router.post("/render", renderQr);
router.post("/", createQr);
router.get("/", listQr);
router.get("/:id", getQr);
router.put("/:id", updateQr);
router.delete("/:id", deleteQr);
router.post("/:id/duplicate", duplicateQr);

export default router;
