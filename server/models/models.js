const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const Message = sequelize.define(
  'message',
  {
    messageId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    senderId: { type: DataTypes.INTEGER },
    receiverName: { type: DataTypes.STRING },
    nameSender: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    messageBody: { type: DataTypes.STRING },
  },
  { timestamps: true },
);

module.exports = { User, Message };
