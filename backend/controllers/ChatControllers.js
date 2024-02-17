import mongoose from "mongoose";
import { ChatSchema } from '../models/chatModel.js';

const Chat = mongoose.model('Chat', ChatSchema);

export const addNewChat = async (req, res) => {
    let newChat = new Chat(req.body);
    let result = await newChat.save();
    res.json(result);
};
export const getChatsByRoomId = async (req, res) => {
    let result = await Chat.find({roomID: req.body.roomID});
    res.json(result);
};