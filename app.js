const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use(bodyParser.json());
//routes
const listsRoute = require('./routes/lists');
const usersRoute = require('./routes/users');

app.use('/lists', listsRoute);
app.use('/api', usersRoute);
// connecting to db
mongoose.connect(process.env.DB_CONNECTION,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },

    () => console.log("connected to DB")
);
app.listen(3001)