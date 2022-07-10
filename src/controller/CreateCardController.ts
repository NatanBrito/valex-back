import { Request, Response } from "express";

import { findByApiKey } from "../repositories/companyRepository.js";

export async function CreateCard(req: Request, res: Response) {
  const { "x-api-key": apiKey } = req.headers as { "x-api-key": string };
  const verifyApiKey = await findByApiKey(apiKey);
  if (!verifyApiKey) return res.status(404).send("company not found");
  res.status(200).send(verifyApiKey);
}
