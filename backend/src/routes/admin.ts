import { Router } from "express";
import { blockUser, changeMessageFrequency, getMessageFrequency, viewAllUsers } from "../controllers/admin";
import { deleteUser } from "../utils/database";
import { cronValidator } from "../middlewares/cronValidator";

const adminRouter = Router();

adminRouter.get("/user", viewAllUsers);
adminRouter.patch("/user", blockUser);
adminRouter.delete("/user", deleteUser);

adminRouter.get("/cron", getMessageFrequency);
adminRouter.post("/cron", cronValidator, changeMessageFrequency);

export { adminRouter };