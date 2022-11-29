const Router = require('express');
const messageController = require('../controllers/messageController');
const router = new Router();
const userController = require('../controllers/userController');

router.post('/login', userController.createUser);
router.get('/users', userController.allUsers);
router.post('/send/message', messageController.createMessage);
router.post('/messages/received', messageController.getMessagesReceived);
router.post('/messages/sended', messageController.getMessagesSended);

module.exports = router;
