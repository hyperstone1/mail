const { Message } = require('../models/models');
const { User } = require('../models/models');

class MessageController {
  async getMessagesReceived(req, res, next) {
    try {
      const chat = await Message.findAll({ where: { receiverName: req.body.user } });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getMessagesSended(req, res, next) {
    try {
      const chat = await Message.findAll({ where: { nameSender: req.body.user } });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createMessage(req, res, next) {
    const { nameSender, receiverName, messageBody, title } = req.body;
    try {
      const sender = await User.findOne({ where: { name: nameSender } });
      const message = await Message.create({
        senderId: sender.id,
        receiverName,
        nameSender,
        title,
        messageBody,
      });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new MessageController();
