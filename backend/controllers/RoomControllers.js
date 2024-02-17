import mongoose from "mongoose";
import { RoomSchema } from '../models/roomModel.js';

const Room = mongoose.model('Room', RoomSchema);

export const addNewRoom = async (req, res) => {
    let newRoom = new Room(req.body);
    let result = await newRoom.save();
    res.json(result);
};
export const JoinRoom = async (req, res) => {
    let result = await Room.findOne({ _id: req.body.roomId });
        if (result) {
            if (result.password === req.body.password) {
                result.password = '**********';
                res.json({ result: result, message: 'Room joined successfully.' });
            }
            else {
                res.json({ result: null, message: 'Invalid Password!!!' });
            }
        }
        else {
            res.json({ result: null, message: 'Invalid Room Id' });
        }
};

export const getMyRooms = async (req, res) => {
    let result = await Room.find({createdBy: req.body.createdBy});
    res.json(result);
};