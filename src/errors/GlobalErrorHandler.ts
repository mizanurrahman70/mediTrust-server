/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../config";
import handleZodError from "./handleZodError";
import handleValidationError from "./handleValidationError";
import handleCastError from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";
import AppError from "./AppError";
import { TErrorSources } from "../types/global.type";

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    const formattedError = handleZodError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error?.name === "ValidationError") {
    const formattedError = handleValidationError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error?.name === "CastError") {
    const formattedError = handleCastError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error?.code === 11000) {
    const formattedError = handleDuplicateError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error,
    stack: config.node_env === 'Development' ? error?.stack : null,
  });
};
