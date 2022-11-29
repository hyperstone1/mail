require('dotenv').config();
const express = require('express');
const router = require('./routes/index');
const cors = require('cors');
const sequelize = require('./db');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/chat', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
  } catch (error) {
    console.log('Error with db connection: ', error);
  }
};
start();
