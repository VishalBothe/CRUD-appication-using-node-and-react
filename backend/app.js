// Built-in packages
require("dotenv").config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// DB connection
const db = require('./dbConfig');

// Routes
app.use('/api', authRouter);
app.use('/api', eventRoutes);
app.use('/api', userRoutes);

// Startting server
const port = process.env.PORT || 7000;

app.listen(port, ()=>{
    console.log(`APP RUNING AT ${port}`);
});
