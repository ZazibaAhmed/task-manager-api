// CRUD 

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb');

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
    const db = client.db(databaseName) // Creats the database and return the database reference

    
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'J',
    //     age: 29
    // }).then((result) => {
    //     // return resolve(correct);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log('Unable to connect to databse');
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Abul',
    //         age: 21
    //     },
    //     {
    //         name: 'Bokrul',
    //         age: 27
    //     }
    // ]).then((result) => {
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
    //     console.log('Unable to connect to databse');
    // })
});



