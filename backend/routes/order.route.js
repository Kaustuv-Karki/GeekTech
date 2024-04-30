import express from "express";
import { calculateOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/calculate", calculateOrder);

export default router;
