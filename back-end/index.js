const express = require('express');
const connection = require('./.configs/db');
const todosRoute = require('./routes/todosRoutes');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/todo', todosRoute);

app.get('/', (req, res) => {
    res.send('Welcome to homepage');
})

app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.port}`);
})