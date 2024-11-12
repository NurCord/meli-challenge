import { getStats } from "../../../src/services/stats.services";

describe("getStats Service", () => {
    test("should return the correct stats object", () => {
        const expectedResponse = {
            count_mutant_dna: 40,
            count_human_dna: 100,
            ratio: 0.4,
        };

        const result = getStats();

        expect(result).toEqual(expectedResponse);
    });

    test("should have count_mutant_dna as a number", () => {
        const result = getStats();
        expect(typeof result.count_mutant_dna).toBe("number");
    });

    test("should have count_human_dna as a number", () => {
        const result = getStats();
        expect(typeof result.count_human_dna).toBe("number");
    });

    test("should have ratio as a number", () => {
        const result = getStats();
        expect(typeof result.ratio).toBe("number");
    });

    test("ratio should be the result of count_mutant_dna divided by count_human_dna", () => {
        const result = getStats();
        const expectedRatio = result.count_mutant_dna / result.count_human_dna;
        expect(result.ratio).toBe(expectedRatio);
    });

    test("should return a ratio of 0 if count_human_dna is 0", () => {
        const originalGetStats = getStats;
        const mockGetStats = jest.fn(() => ({
            count_mutant_dna: 40,
            count_human_dna: 0,
            ratio: 0,
        }));
        (getStats as any) = mockGetStats;

        const result = getStats();
        expect(result.ratio).toBe(0);

        (getStats as any) = originalGetStats;
    });
});