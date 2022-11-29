const { User } = require('../models/models');

class UserController {
  async createUser(req, res, next) {
    const { name } = req.body;
    if (req.body === {}) {
      return res.status(500).json('Пустой');
    }
    console.log(req.body);
    try {
      const user = await User.create({ name });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async allUsers(req, res) {
    try {
      const usersTable = await User.findAll();
      res.json(usersTable);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
}
module.exports = new UserController();
