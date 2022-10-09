const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'task-manager-api';

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
})

const User = mongoose.model('User', {
    name : {
        type: String
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description : {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const me = new User({
//     name: "Zaziba",
//     age: 26
// });

// me.save().then(()=>{
//     // console.log(result);
//     console.log(me);
// }).catch((error) => {
//     console.log('error')
// })

const task = new Task({
    description : "Clean room",
    completed : false
});

task.save().then((result)=>{
    console.log(result);
    console.log(task);
}).catch((error) => {
    console.log('error')
})