import express from "express";
import { mutant } from "../controllers";
const mutantRoutes = express.Router();

mutantRoutes.post("/", mutant);

export { mutantRoutes };
