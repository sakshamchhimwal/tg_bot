import { Router } from "express";
import { blockUser, changeMessageFrequency, getMessageFrequency, removeUser, viewAllUsers } from "../controllers/admin";
import { cronValidator } from "../middlewares/cronValidator";

const adminRouter = Router();

adminRouter.get("/user", viewAllUsers);
adminRouter.patch("/user", blockUser);
adminRouter.delete("/user", removeUser);

adminRouter.get("/cron", getMessageFrequency);
adminRouter.post("/cron", cronValidator, changeMessageFrequency);

export { adminRouter };