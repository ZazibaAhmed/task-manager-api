// CRUD 

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to databse');
    }

    console.log('Connected correctly!');
    const db = client.db(databaseName) // Creates the database and return the database reference

    
    // db.collection('users').insertOne({
    //     // _id: id,
    //     name: 'J',
    //     age: 29
    // }).then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to databse');
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Wash Dishes',
    //         completed: false
    //     },
    //     {
    //         description: 'Clean Room',
    //         completed: true
    //     },
    // ]).then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to database');
    // })

    // db.collection('users').findOne({
    //     name: 'J',
    // }).then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to databse');
    // })

    // db.collection('users').find({ name: 'J',})
    // .toArray()
    // .then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to databse');
    // })

    // db.collection('users').find({ name: 'J',})
    // .count()
    // .then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to databse');
    // })

    // db.collection('tasks').findOne({ _id: new ObjectId('6341dd3beef33cc5796447e9'),})
    // .then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to databse');
    // })

    // db.collection('tasks').find({ completed: false,})
    // .toArray()
    // .then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to databse');
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectId('633f358e7919e85017741532'),
    // }, {
    //     // $set: {
    //     //     name: 'Jay'
    //     // }
    //     $inc: {
    //         age: -1
    //     }
    // }).then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to database');
    // })

    // db.collection('tasks').updateMany({
    //     completed: false,
    // }, {
    //     $set: {
    //         completed: true,
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to database', error);
    // })

    
    // db.collection('users').deleteMany({
    //     age: 1
    // }).then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to database');
    // })

    db.collection('tasks').deleteOne({
        description: "clean room"
    }).then((result) => {
        // return resolve(correct);
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    
});



