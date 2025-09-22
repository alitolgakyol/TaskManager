const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config();
const notFound = require('./middleware/not-found')

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
    } catch (error) {
        console.log(error);
    }
}

start();

//middleware
app.use(notFound);
app.use(express.static('./public'));
app.use(express.json());

//routes

app.use('/api/v1/tasks', tasks);





