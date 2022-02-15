const express = require('express');
const app = express();

const port = 8000;

const tasks = require('./routes/tracks');

const connectDB = require('./db/connect');

require('dotenv').config();

// middleware
app.use(express.json());

//routes
app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});

app.use('/api/v1/tracks', tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
