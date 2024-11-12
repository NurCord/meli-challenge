import { getStats } from "../../../src/services/stats.services";
import DnaSequence from "../../../src/models/DnaSequence";

jest.mock("../../../src/models/DnaSequence");

describe("getStats Service", () => {
    test("should return the correct stats object", async () => {
        const expectedResponse = {
            count_mutant_dna: 40,
            count_human_dna: 100,
            ratio: 0.4,
        };

        (DnaSequence.count as jest.Mock).mockResolvedValueOnce(40).mockResolvedValueOnce(100);

        const result = await getStats();

        expect(result).toEqual(expectedResponse);
    });

    test("should have count_mutant_dna as a number", async () => {
        (DnaSequence.count as jest.Mock).mockResolvedValueOnce(40).mockResolvedValueOnce(100);

        const result = await getStats();
        expect(typeof result.count_mutant_dna).toBe("number");
    });

    test("should have count_human_dna as a number", async () => {
        (DnaSequence.count as jest.Mock).mockResolvedValueOnce(40).mockResolvedValueOnce(100);

        const result = await getStats();
        expect(typeof result.count_human_dna).toBe("number");
    });

    test("should have ratio as a number", async () => {
        (DnaSequence.count as jest.Mock).mockResolvedValueOnce(40).mockResolvedValueOnce(100);

        const result = await getStats();
        expect(typeof result.ratio).toBe("number");
    });

    test("ratio should be the result of count_mutant_dna divided by count_human_dna", async () => {
        (DnaSequence.count as jest.Mock).mockResolvedValueOnce(40).mockResolvedValueOnce(100);

        const result = await getStats();
        const expectedRatio = result.count_mutant_dna / result.count_human_dna;
        expect(result.ratio).toBe(expectedRatio);
    });

    test("should return a ratio of 1 if count_human_dna is 0", async () => {
        (DnaSequence.count as jest.Mock).mockResolvedValueOnce(40).mockResolvedValueOnce(0);

        const result = await getStats();
        expect(result.ratio).toBe(1);
    });

    test("should throw an error if there is an issue fetching the stats", async () => {
        (DnaSequence.count as jest.Mock).mockRejectedValue(new Error("Database error"));

        await expect(getStats()).rejects.toThrow("Error al obtener las estadísticas");
    });
});