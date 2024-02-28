import cron from "cron-validate";
import { NextFunction, Request, Response } from "express";

export const cronValidator = (req: Request, res: Response, next: NextFunction) => {
    const { newCron } = req.body;
    const check = cron(newCron);
    if (check.isValid()) {
        next();
    } else {
        return res.status(400).send({ "message": "INVALID_CRON_STRING" });
    }
}