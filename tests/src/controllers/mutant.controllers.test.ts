import { Request, Response } from "express";
import { mutant } from "../../../src/controllers";
import { describe, expect, test } from "@jest/globals";
import { getIsMutant } from "../../../src/services";

jest.mock("../../../src/services");

describe("Mutant Controller", () => {
  test("should return 200 if the DNA is mutant", () => {
    const req = {
      body: {
        dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (getIsMutant as jest.Mock).mockReturnValue(true);
    mutant(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Mutant detected");
  });

  test("should return 403 if the DNA is not mutant", () => {
    const req = {
      body: {
        dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"],
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (getIsMutant as jest.Mock).mockReturnValue(false);
    mutant(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Not a mutant");
  });

  test("should return 400 if the DNA is invalid", () => {
    const req = {
      body: {
        dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA"],
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (getIsMutant as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid DNA");
    });

    mutant(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid DNA");
  });
});
