import { getIsMutant } from "../../../src/services/mutant.services";
import { countHorizontalPatterns, countPatterns } from "../../../src/utils/mutant";

jest.mock("../../../src/utils/mutant");

describe("getIsMutant Service", () => {
    test("should return true if there are more than one pattern", () => {
        (countHorizontalPatterns as jest.Mock).mockReturnValue(1);
        (countPatterns as jest.Mock).mockReturnValue(1);

        const sequences = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
        const result = getIsMutant(sequences);

        expect(result).toBe(true);
    });

    test("should return false if there is only one pattern", () => {
        (countHorizontalPatterns as jest.Mock).mockReturnValue(1);
        (countPatterns as jest.Mock).mockReturnValue(0);

        const sequences = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
        const result = getIsMutant(sequences);

        expect(result).toBe(false);
    });

    test("should return false if there are no patterns", () => {
        (countHorizontalPatterns as jest.Mock).mockReturnValue(0);
        (countPatterns as jest.Mock).mockReturnValue(0);

        const sequences = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
        const result = getIsMutant(sequences);

        expect(result).toBe(false);
    });

    test("should handle empty sequences", () => {
        (countHorizontalPatterns as jest.Mock).mockReturnValue(0);
        (countPatterns as jest.Mock).mockReturnValue(0);

        const sequences: string[] = [];
        const result = getIsMutant(sequences);

        expect(result).toBe(false);
    });

    test("should handle sequences with different lengths", () => {
        (countHorizontalPatterns as jest.Mock).mockReturnValue(0);
        (countPatterns as jest.Mock).mockReturnValue(0);

        const sequences = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA"];
        const result = getIsMutant(sequences);

        expect(result).toBe(false);
    });

    test("should handle sequences with invalid characters", () => {
        (countHorizontalPatterns as jest.Mock).mockReturnValue(0);
        (countPatterns as jest.Mock).mockReturnValue(0);

        const sequences = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCXTA", "TCACTG"];
        const result = getIsMutant(sequences);

        expect(result).toBe(false);
    });
});