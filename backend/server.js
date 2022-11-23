const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./config/db');
const colors = require('colors');

const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5100;

// run function to connect to the database;
connectDB();

// express middleware for parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Setting up routes
// Moves HTTP requests from server.js file to improve file structure
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));

// tells app to use middleware errorHandler instead of default
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('HI BABY!!!')
})

app.listen(port,
  console.log(`Running in ${process.env.NODE_ENV} mode on port ${port}`)
);