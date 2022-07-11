import { Request, Response } from "express";

// import * as verifyServices from "../services/ValidationService.js";
import * as ActiveCardService from "../services/ActiveCardService.js";

export async function activeCard(req: Request, res: Response) {
  // trazer os req
  // descrypt para fazer a comparaçao
  // trazer a function do service e comparar
  const decrypt = ActiveCardService.descryptedCvc("");

  res.status(200).send(decrypt);
}
