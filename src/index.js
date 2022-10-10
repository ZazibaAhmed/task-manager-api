const express = require('express');
require('./db/mongoose'); // Simply by calling require we make sure the file runs  and db is connected
const User = require('./models/user');
const Task = require('./models/task');
const { isObjectIdOrHexString } = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

//Automatically parses incoming JSON to an object
app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        await  user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error); 
    }
   
    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((error)=>{
    //     res.status(400).send(error); 
    // });
})

app.get('/users', async (req, res) => {

    try {
        const users = await  User.find({});
        res.status(201).send(users);
    } catch (error) {
        res.status(500).send(); 
    }

})

app.get('/users/:id', async (req, res) => {

    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if(!user){
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(); 
    }
})

app.patch('/users/:id', async (req, res) => {

    const _id = req.params.id;
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((key) => allowedUpdates.includes(key)); 

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates!'});
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new : true, runValidators: true });

        if(!user){
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error); 
    }
})

app.delete('/users/:id', async (req, res) => {

    const _id = req.params.id;
    // User.findByIdAndDelete(_id);
    // try {
    //     const user = await User.findById(_id);

    //     if(!user){
    //         return res.status(404).send();
    //     }

    //     res.send(user);
    // } catch (error) {
    //     res.status(500).send(); 
    // }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(); 
    }
})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(); 
    }
})

app.get('/tasks/:id', async (req, res) => {

    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);

        if(!task){
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(); 
    }
    
})

app.patch('/tasks/:id', async (req, res) => {

    const _id = req.params.id;
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((key) => allowedUpdates.includes(key)); 

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates!'});
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new : true, runValidators: true });

        if(!task){
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(400).send(error); 
    }
})

app.listen(port, () => {
    console.log('Server up on port '+ port);
})