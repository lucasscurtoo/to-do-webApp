/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config();

const app = express();
const port = 7000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })
//middlewares
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))



const auth = require('./src/routes/auth');
const validateToken = require('./src/middlewares/validate-token')
const lists = require('./src/routes/lists')
const tasks = require('./src/routes/tasks')

app.use("/auth", auth);
app.use("/lists", validateToken, lists);
app.use("/tasks", validateToken, tasks)

app.listen(port, () => 
    console.log('server running on port', port)
)

