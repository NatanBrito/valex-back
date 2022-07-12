import { Request, Response } from "express";

export function blockCard(req: Request, res: Response) {
  res.sendStatus(200);
}
// FIX lembrar que no db esta como true o isBlocked
