const express = require('express');
require('./db/mongoose'); // Simply by calling require we make sure the file runs  and db is connected
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Automatically parses incoming JSON to an object
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server up on port '+ port);
})

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     // const task = await Task.findById('63665eaa62ea6624b04a8af7');
//     // await task.populate('owner');
//     // console.log(task.owner); 

//     const user = await User.findById('63669b922fbf08f07296d89e');
//     await user.populate('tasks');
//     console.log(user.tasks);
// }

// main()