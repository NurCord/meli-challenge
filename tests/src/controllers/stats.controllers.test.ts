import { Request, Response } from "express";
import { getStats } from "../../../src/services";
import { stats } from "../../../src/controllers";

jest.mock("../../../src/services", () => ({
  getStats: jest.fn(),
}));

describe("stats controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    req = {};
    res = { status: statusMock, json: jsonMock, send: sendMock };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debería retornar 200 y los stats cuando getStats tiene éxito", async () => {
    const mockStats = { count_mutant_dna: 40, count_human_dna: 100, ratio: 0.4 };
    (getStats as jest.Mock).mockResolvedValue(mockStats);

    await stats(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockStats);
  });

  test("debería retornar 500 si ocurre un error inesperado", async () => {
    (getStats as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

    await stats(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith("Internal Server Error");
  });
});
