import { Request, Response } from "express";
import { mutant } from "../../../src/controllers";
import { getIsMutant } from "../../../src/services";
import DnaSequence from "../../../src/models/DnaSequence";

jest.mock("../../../src/services", () => ({
  getIsMutant: jest.fn(),
}));

jest.mock("../../../src/models/DnaSequence", () => ({
  create: jest.fn(),
}));

describe("mutant controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    sendMock = jest.fn();
    req = { body: {} };
    res = { status: statusMock, send: sendMock };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debería retornar 400 si el ADN es inválido", async () => {
    req.body = { dna: ["ATGCGA", "CGGTGC", "TTATGT", "AGTAGG", "Invalid", "TCACGC"] };

    await mutant(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(sendMock).toHaveBeenCalledWith("Invalid DNA");
  });

  test("debería retornar 200 si el ADN es de un mutante", async () => {
    req.body = { dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"] };
    (getIsMutant as jest.Mock).mockReturnValue(true);

    await mutant(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith("Mutant detected");
    expect(DnaSequence.create).toHaveBeenCalledWith({
      sequence: JSON.stringify(req.body.dna),
      isMutant: true,
    });
  });

  test("debería retornar 403 si el ADN no es de un mutante", async () => {
    req.body = { dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"] };
    (getIsMutant as jest.Mock).mockReturnValue(false);

    await mutant(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(403);
    expect(sendMock).toHaveBeenCalledWith("Not a mutant");
    expect(DnaSequence.create).toHaveBeenCalledWith({
      sequence: JSON.stringify(req.body.dna),
      isMutant: false,
    });
  });

  test("debería retornar 500 si ocurre un error inesperado", async () => {
    req.body = { dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"] };
    (getIsMutant as jest.Mock).mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    await mutant(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith("Internal Server Error");
  });
});
