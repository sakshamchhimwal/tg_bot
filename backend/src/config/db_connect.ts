import { connect } from "mongoose";

export const connectToMongoDB = async (connectionURI: string) => {
    try {
        const conn = await connect(connectionURI, { dbName: "TG_Bot_Users" });
        console.log("Successfully connected to MongoDB");
    } catch (err) {
        throw err;
    }
}