import { Request, Response } from "express";
import { getIsMutant } from "../services";
import { dnaSchema } from "../schemas";

// sacar any
export const mutant = (req: Request, res: Response): any => {
  try {
    const validation = dnaSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).send("Invalid DNA");
    }
    const isMutant = getIsMutant(validation.data.dna);
    if (isMutant) {
      return res.status(200).send("Mutant detected");
    } else {
      return res.status(403).send("Not a mutant");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
