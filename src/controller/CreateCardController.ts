import { Request, Response } from "express";

export async function CreateCard(req: Request, res: Response) {
  const { "x-api-key": apiKey } = req.headers as { "x-api-key": string };

  res.status(200).send(apiKey);
}
