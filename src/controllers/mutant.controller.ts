import { Request, Response } from "express";
import { getIsMutant } from "../services";
import { dnaSchema } from "../schemas";
import DnaSequence from "../models/DnaSequence";

export const mutant = async (req: Request, res: Response): Promise<any> => {
  try {
    const { dna } = req.body;
    const validation = dnaSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).send("Invalid DNA");
    }
    const isMutant = getIsMutant(dna);
    await DnaSequence.create({
      sequence: JSON.stringify(dna),
      isMutant,
    });
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
