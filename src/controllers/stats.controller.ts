import { Request, Response } from "express";
import { getStats } from "../services";

export const stats = async (req: Request, res: Response) => {
  const stats = getStats();
  console.log('sdsd')
  res.status(200).json(stats);
};
