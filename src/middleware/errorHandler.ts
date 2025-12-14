import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;

  const errorResponse = {
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_ERROR",
    statusCode,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  };

  // Log detallado (solo backend)
  console.error({
    ...errorResponse,
    stack: err.stack,
    details: err.details,
  });

  res.status(statusCode).json(errorResponse);
};
