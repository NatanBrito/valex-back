import { Request, Response } from "express";

export async function Teste(req: Request, res: Response) {
  res.status(200).send("fumegando");
}
