import { config } from "dotenv";
config();
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { connectToMongoDB } from "./config/db_connect";
import { smee } from "./services/webhookService";
import { mountWebHook } from "./utils/mountWebHook";
import { indexRouter } from "./routes";
import { messageCRONJob } from "./services/cronService";
import { adminRouter } from "./routes/admin";
import xss from "xss";

connectToMongoDB(<string>process.env.MONGO_DB_URL);
mountWebHook();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const html = xss('<script>alert("xss");</script>');
console.log(html);
// error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log("called");

    // send the error message
    return res.status(500).send({ "message": "INTERNAL_SERVER_ERROR" });
});

app.use("/", indexRouter);
app.use("/admin", adminRouter);

app.listen(8000, () => {
    smee.start();
    messageCRONJob.start();
    console.log("Server listening on 8000");
})