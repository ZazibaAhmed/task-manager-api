// CRUD 

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to databse');
    }

    console.log('Connected correctly!');
    const db = client.db(databaseName) // Creats the database and return the database reference

    
    // db.collection('users').insertOne({
    //     name: 'Zaziba',
    //     age: 26
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

    db.collection('tasks').insertMany([
        {
            description: 'Wash Dishes',
            completed: false
        },
        {
            description: 'Clean Room',
            completed: true
        },
    ]).then((result) => {
        // return resolve(correct);
        console.log(result);
    }).catch((error) => {
        console.log('Unable to connect to databse');
    })
});



