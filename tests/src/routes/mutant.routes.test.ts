import request from "supertest";
import express from "express";
import { mutantRoutes } from "../../../src/routes/mutant.routes";
import { getIsMutant } from "../../../src/services";

jest.mock("../../../src/services");

const app = express();
app.use(express.json());
app.use(mutantRoutes);

describe("Mutant Routes", () => {
    test("should return 200 if the DNA is mutant", async () => {
        (getIsMutant as jest.Mock).mockReturnValue(true);

        const response = await request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
            });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Mutant detected");
    });

    test("should return 403 if the DNA is not mutant", async () => {
        (getIsMutant as jest.Mock).mockReturnValue(false);

        const response = await request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"],
            });

        expect(response.status).toBe(403);
        expect(response.text).toBe("Not a mutant");
    });

    test("should return 400 if the DNA is invalid", async () => {
        (getIsMutant as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid DNA");
        });

        const response = await request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA"],
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid DNA");
    });

    test("should return 400 if the DNA is missing", async () => {
        const response = await request(app)
            .post("/mutant")
            .send({});

        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid DNA");
    });

    test("should return 400 if the DNA is not an array", async () => {
        const response = await request(app)
            .post("/mutant")
            .send({
                dna: "ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG",
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid DNA");
    });

    test("should return 400 if the DNA array contains non-string elements", async () => {
        const response = await request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", 12345, "AGAAGG", "CCCCTA", "TCACTG"],
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid DNA");
    });

    test("should return 400 if the DNA array contains strings of different lengths", async () => {
        const response = await request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACT"],
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid DNA");
    });

    test("should return 500 if there is an internal server error", async () => {
        (getIsMutant as jest.Mock).mockImplementation(() => {
            throw new Error("Internal Server Error");
        });

        const response = await request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
            });

        expect(response.status).toBe(500);
        expect(response.text).toBe("Internal Server Error");
    });

    test("should return 400 if the DNA array contains invalid characters", async () => {
        const response = await request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCXTA", "TCACTG"],
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid DNA");
    });

    test("should return 400 if the DNA array is empty", async () => {
        const response = await request(app)
            .post("/mutant")
            .send({
                dna: [],
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid DNA");
    });
});