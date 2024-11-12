import { Request, Response } from "express";
import { getStats } from "../services";

export const stats = async (req: Request, res: Response): Promise<any> => {
  try {
    const stats = await getStats();
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
