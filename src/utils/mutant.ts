import { PATTERNS } from "./constants";
import { Sequences } from "../types/types";

const { DIAGONAL_LEFT, DIAGONAL_RIGHT, INCREMENT_SEQUENCE_IN, VERTICAL } =
  PATTERNS;

const countHorizontalPatterns = (sequences: Sequences) => {
  const regex = /([A-Z])\1{3}/;
  return sequences.filter((sequence: string) => regex.test(sequence)).length;
};

const countPatternInDirection = (
  sequences: Sequences,
  sequenceIndex: number,
  letterIndex: number,
  deltaX: number,
  deltaY: number
) => {
  let count = 1;
  const letter = sequences[sequenceIndex][letterIndex];

  while (count < 4) {
    sequenceIndex += deltaX;
    letterIndex += deltaY;

    if (
      !sequences[sequenceIndex] ||
      sequences[sequenceIndex][letterIndex] !== letter
    ) {
      break;
    }
    count++;
  }
  return count === 4 ? 1 : 0;
};

const countPatterns = (sequences: Sequences) => {
  let count = 0;
  for (
    let sequenceIndex = 0;
    sequenceIndex < sequences.length;
    sequenceIndex++
  ) {
    for (
      let letterIndex = 0;
      letterIndex < sequences[sequenceIndex].length;
      letterIndex++
    ) {
      count += countPatternInDirection(
        sequences,
        sequenceIndex,
        letterIndex,
        INCREMENT_SEQUENCE_IN,
        VERTICAL
      );
      count += countPatternInDirection(
        sequences,
        sequenceIndex,
        letterIndex,
        INCREMENT_SEQUENCE_IN,
        DIAGONAL_RIGHT
      );
      count += countPatternInDirection(
        sequences,
        sequenceIndex,
        letterIndex,
        INCREMENT_SEQUENCE_IN,
        DIAGONAL_LEFT
      );
    }
  }
  return count;
};

export { countHorizontalPatterns, countPatterns };
