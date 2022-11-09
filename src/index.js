const express = require('express');
require('./db/mongoose'); // Simply by calling require we make sure the file runs  and db is connected
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json()); //Automatically parses incoming JSON to an object
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server up on port '+ port);
})
