import express from "express";
import { stats } from "../controllers";
const statsRoutes = express.Router();

statsRoutes.post("/stats", stats);

export { statsRoutes };
