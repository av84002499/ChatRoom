import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ChatSchema = new Schema({
    chat: {
        type: String,
        required: true
    },
    roomID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})