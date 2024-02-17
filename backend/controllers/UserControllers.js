import mongoose from "mongoose";
import { UserSchema } from '../models/userModel.js';

const User = mongoose.model('User', UserSchema);

export const addNewUser = async (req, res) => {
    let newUser = new User(req.body);
    let result = await newUser.save();
    res.json(result);
};
export const getUsers = async (req, res) => {
    let result = await User.find({});
    res.json(result);
};

export const loginUser = async (req, res) => {
    if (req.body.password1 == req.body.password2) {
        let result = await User.findOne({ email: req.body.email });
        if (result) {
            if (result.password === req.body.password1) {
                result.password = '**********';
                req.session.user = result;
                res.json({ result: result, user : req.session.user, message: 'You are logged in successfully.' });
            }
            else {
                res.json({ result: null, message: 'Invalid Password!!!' });
            }
        }
        else {
            res.json({ result: null, message: 'User not registered!!!' });
        }
    }
    else {
        res.json({ result: null, message: 'Password did not match!!!' });
    }
};

export const logoutUser = async (req, res) => {
    const user = req.session.user;
    req.session.destroy();
    res.json({ result: null, user : user, message: 'You are logged out successfully.' });
};

export const getUser = async (req, res) => {
    let result = await User.findById(req.params.userId);
    res.json(result);
};
export const updateUser = async (req, res) => {
    let result = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
    res.json(result);
};
export const deleteUser = async (req, res) => {
    let result = await User.deleteOne({ _id: req.params.userId });
    res.json({ message: 'Successfully Deleted the User.', Result: result });
};