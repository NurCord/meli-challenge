import { countHorizontalPatterns, countPatterns } from "../../../src/utils/mutant";

describe("Mutant Utils", () => {
    describe("countHorizontalPatterns", () => {
        test("should return 1 when there is one horizontal pattern", () => {
            const sequences = ["ATGCGA", "CAGTGC", "TTTAGT", "AGAAGG", "CCCCTA", "TCACTG"];
            const result = countHorizontalPatterns(sequences);
            expect(result).toBe(1);
        });

        test("should return 0 when there are no horizontal patterns", () => {
            const sequences = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCATA", "TCACTG"];
            const result = countHorizontalPatterns(sequences);
            expect(result).toBe(0);
        });

        test("should return 2 when there are two horizontal patterns", () => {
            const sequences = ["ATGCGA", "CAGTGC", "TTTTGT", "AGAAGG", "CCCCTA", "TCACAA"];
            const result = countHorizontalPatterns(sequences);
            expect(result).toBe(2);
        });
    });

    describe("countPatterns", () => {
        test("should return 1 when there is one vertical pattern", () => {
            const sequences = ["ATGCGA", "CAGTGC", "TTCTGT", "AGAAGG", "CCCCTA", "TCACTG"];
            const result = countPatterns(sequences);
            expect(result).toBe(1);
        });

        test("should return 0 when there are no patterns", () => {
            const sequences = ["ATGCGA", "CAGTGC", "TTCTGT", "AGAACG", "CCACTA", "TCTCTG"];
            // A T G C G A
            // C A G T G C
            // T T C T G T
            // A G A A C G
            // C C A C T A
            // T C T C T G
            const result = countPatterns(sequences);
            expect(result).toBe(0);
        });

        test("should return 2 when there are two patterns", () => {
            const sequences = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
            const result = countPatterns(sequences);
            expect(result).toBe(2);
        });

        test("should return 1 when there is one diagonal right pattern", () => {
            const sequences = ["ATGCGA", "CAGTGC", "TTAAGT", "AGACGG", "CCACTA", "TCTCTG"];
            const result = countPatterns(sequences);
            expect(result).toBe(1);
        });

        test("should return 1 when there is one diagonal left pattern", () => {
            const sequences = ["ATCCGA", "CAGGGC", "TTGTGT", "AGGGAT"];
            const result = countPatterns(sequences);
            expect(result).toBe(1);
        });

        test("should return 0 when sequences are empty", () => {
            const sequences: string[] = [];
            const result = countPatterns(sequences);
            expect(result).toBe(0);
        });
    });
});