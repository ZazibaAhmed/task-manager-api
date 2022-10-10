const express = require('express');
require('./db/mongoose'); // Simply by calling require we make sure the file runs  and db is connected
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

//Automatically parses incoming JSON to an object
app.use(express.json());

app.post('/users',(req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((error)=>{
        res.status(400).send(error); 
    });
})

app.post('/tasks',(req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error); 
    });
})


// const me = new User({
//     name: ' Shanata ',
//     email: 'SHANATA@GMAIL.COM',
//     password: 'passwor'
// });

// me.save().then(()=>{
//     // console.log(result);
//     console.log(me);
// }).catch((error) => {
//     console.log('error', error)
// })

// const task = new Task({
//     description : "Polish room",
// });

// task.save().then((result)=>{
//     console.log(result);
//     console.log(task);
// }).catch((error) => {
//     console.log('error')
// })

app.listen(port, () => {
    console.log('Server up on port '+ port);
})