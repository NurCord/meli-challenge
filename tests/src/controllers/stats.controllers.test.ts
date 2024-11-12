import { Request, Response } from "express";
import { stats } from "../../../src/controllers/stats.controller";
import { describe, expect, test } from "@jest/globals";
import { getStats } from "../../../src/services";

jest.mock("../../../src/services");

describe("Stats Controller", () => {
  test("should return 200 and stats data", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockStats = { users: 100, active: 50 };
    (getStats as jest.Mock).mockReturnValue(mockStats);

    await stats(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStats);
  });
});