const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'task-manager-api';

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
})

const User = mongoose.model('User', {
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number');
            }
        }
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot be "password"');
            }
        }
    },
})

const Task = mongoose.model('Task', {
    description : {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
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

const task = new Task({
    description : "Polish room",
});

task.save().then((result)=>{
    console.log(result);
    console.log(task);
}).catch((error) => {
    console.log('error')
})