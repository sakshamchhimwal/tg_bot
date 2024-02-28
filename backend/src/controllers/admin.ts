import { NextFunction, Request, Response } from "express";
import { deleteUser, findUser, getAllUsers } from "../utils/database"
import { getCronString, updateCronString } from "../services/cronService";

export const viewAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await getAllUsers();
        res.status(200).send({ allUsers });
    } catch (err) {
        return next(err);
    }
}

export const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chatId } = req.body;
        const user = await findUser(chatId);
        if (user) {
            await user.updateOne({ blocked: true });
            await user.save();
            return res.status(200).send({ "messgae": "BLOCKED_SUCCESSFULLY" });
        } else {
            return res.status(403).send({ "message": "USER_NOT_FOUND" });
        }
    } catch (err) {
        return next(err);
    }
}

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chatId } = req.body;
        const user = await deleteUser(chatId);
        if (user) {
            return res.status(200).send({ "message": "USER_DELETED_SUCCESSFULLY" });
        } else {
            return res.status(403).send({ "message": "USER_NOT_FOUND" });
        }
    } catch (err) {
        return next(err);
    }
}

export const changeMessageFrequency = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { newCron } = req.body;
        updateCronString(newCron);
        return res.status(200).send({ "message": "CRON_STRING_UPDATED" });
    } catch (err) {
        return next(err);
    }
}

export const getMessageFrequency = (req: Request, res: Response, next: NextFunction) => {
    try {
        const cronString: string = getCronString();
        return res.status(200).send({ "cron": cronString });
    } catch (err) {
        return next(err);
    }
}