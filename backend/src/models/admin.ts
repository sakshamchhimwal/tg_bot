import mongoose, { Schema } from "mongoose";

const admin = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    }
})

const Admin = mongoose.model("admin", admin);
export { Admin };