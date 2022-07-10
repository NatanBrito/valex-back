import { NextFunction, Request, Response } from "express";

const schemaValidateMiddleware = (schema: any) => {
  return (schemaValidateMiddleware[schema] = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(422).send(error.details.map(({ message }) => message));
    next();
  });
};

export default schemaValidateMiddleware;
