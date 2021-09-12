import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// TODO (Daniel) set up logging and monitoring
export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // await logger.logError(error);
    // await fireMonitoringMetric(error);
    crashIfUntrustedErrorOrSendResponse(err, res);
}

// centralized error object
export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: number;
    public readonly isOperational: boolean;

    constructor(
        name: string,
        httpCode: number,
        description: string,
        isOperational: boolean
    ) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

// Add expected error codes here
async function crashIfUntrustedErrorOrSendResponse(err: Error, res: Response) {
    if (err instanceof AppError && err.isOperational) {
        return res.status(err.httpCode).send(err.name);
    } else {
        res.send(500);
        // TODO (Daniel) gracefully crash and restart
    }
}
