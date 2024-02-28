import mongoose, { Schema } from "mongoose";

const user = new Schema({
    chatId: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        indexedDB: true
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        indexedDB: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    city: {
        type: Schema.Types.String,
        required: true
    },
    state: {
        type: Schema.Types.String,
        required: true
    },
    country: {
        type: Schema.Types.String,
        required: true
    },
    joined: {
        type: Schema.Types.Number,
        required: true
    },
    blocked: {
        type: Schema.Types.Boolean,
        default: false,
    }
})

export const User = mongoose.model("user", user);