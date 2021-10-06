import express from "express";
import Joi from "joi";
import { AppError } from "../errors";

export const validate = (schema: Joi.ObjectSchema<any>) => {
    return async function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const validated = schema.validate(req.body).value;
            req.body = validated;
            next();
        } catch (err) {
            if (err.isJoi) {
                throw new AppError("Validation Error", 403, err.message, true);
            }
            throw new AppError("Unknown", 500, err.message, false);
        }
    };
};
