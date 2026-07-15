import { Router } from "express";
import authRoutes from "./auth.routes";
import qrRoutes from "./qr.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/qr", qrRoutes);

export default router;
