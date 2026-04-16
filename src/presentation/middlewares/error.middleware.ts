import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../shared/errors/http-error";


export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: err.message,
    });
  }

  console.error(err); // fallback log

  return res.status(500).json({
    error: "Internal server error",
  });
};