const Message = require('../models/messageModel');

//add message
const sendMessage = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = await Message.create({ name, email, message });
        res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        next(error);
    }
};
//seen messages
const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        next(error);
    }
};


module.exports = { sendMessage, getMessages };