import { Request, Response } from "express";

export async function Teste(req: Request, res: Response) {
  res.sendStatus(200);
}
