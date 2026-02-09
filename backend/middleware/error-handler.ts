import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error({ err }, "Unhandled error");

  const status = "status" in err && typeof err.status === "number" ? err.status : 500;
  const message = process.env.NODE_ENV === "production" ? "Internal server error" : err.message;

  res.status(status).json({ error: message });
}
