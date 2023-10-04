import { NextFunction, Request, Response } from "express";

import { ErrorWithStatus } from "../types";

export function notFound(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const { method, url } = req;
  const message = `${method.toUpperCase()} ${url} not found.`;
  res.status(404).json({ method, message, url });
}

export function catchAllErrors(
  error: ErrorWithStatus,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const { method, url } = req;
  const code = error.statusCode || 500;
  const message = error.message || "An unexpected error occured.";
  res.status(code).json({ method, message, url });
}
