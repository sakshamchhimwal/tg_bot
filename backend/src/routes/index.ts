import { NextFunction, Request, Response, Router } from "express";
import { handleEvent } from "../controllers/event";

const indexRouter = Router();

indexRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send({ "Message": "Connected" });
})


indexRouter.post('/events', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await handleEvent(req.body);
        return res.status(204).send({});
    } catch (err) {
        return next(err);
    }
})

export { indexRouter }