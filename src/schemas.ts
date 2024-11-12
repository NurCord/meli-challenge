import { z } from "zod";

export const dnaSchema = z.object({
  dna: z.array(z.string().regex(/^[ATCG]{6}$/)),
});
