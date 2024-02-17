import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const RoomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})