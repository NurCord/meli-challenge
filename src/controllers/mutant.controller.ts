import { Request, Response } from "express";
import { getIsMutant } from "../services";

export const mutant = (req: Request, res: Response) => {
  const { dna } = req.body;
  const isMutant = getIsMutant(dna);
  if (isMutant) {
    res.status(200).send("Mutant detected");
  } else {
    res.status(403).send("Not a mutant");
  }
}