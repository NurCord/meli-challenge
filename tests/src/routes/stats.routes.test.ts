import request from "supertest";
import express from "express";
import { statsRoutes } from "../../../src/routes/stats.routes";
import { getStats } from "../../../src/services";

jest.mock("../../../src/services");

const app = express();
app.use(express.json());
app.use(statsRoutes);

describe("Stats Routes", () => {
    test("should return 200 and stats data", async () => {
        const mockStats = { users: 100, active: 50 };
        (getStats as jest.Mock).mockReturnValue(mockStats);

        const response = await request(app).get("/stats");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockStats);
    });

    test("should return 500 if there is an internal server error", async () => {
        (getStats as jest.Mock).mockImplementation(() => {
            throw new Error("Internal Server Error");
        });

        const response = await request(app).get("/stats");

        expect(response.status).toBe(500);
        expect(response.text).toBe("Internal Server Error");
    });

    test("should return 404 for an invalid route", async () => {
        const response = await request(app).get("/invalid-route");

        expect(response.status).toBe(404);
    });
});