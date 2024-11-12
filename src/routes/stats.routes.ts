import express from "express";
import { stats } from "../controllers";
const statsRoutes = express.Router();

statsRoutes.get("/", stats);

export { statsRoutes };
