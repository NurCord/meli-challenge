import { Sequences } from "../types/types";
import { countHorizontalPatterns, countPatterns } from "../utils/mutant";

export const getIsMutant = (sequences: Sequences) => {
  const horizontalCount = countHorizontalPatterns(sequences);
  const otherPatternsCount = countPatterns(sequences);
  return horizontalCount + otherPatternsCount > 1;
};
