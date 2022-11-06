const express = require('express');
require('./db/mongoose'); // Simply by calling require we make sure the file runs  and db is connected
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000 // 1Mb
    },
    fileFilter(req, file, cb){

        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a word doc'))
        }

        cb(undefined, true);

        // cb(new Error('Please upload a PDF')) // when error occurs
        // cb(undefined, true) // when upload is fine; Accepts it
        // cb(undefined, false) // silently rejects the call
    }
})

const errorMiddleware = (req, res, next) => {
    throw new Error('From my middleware')
}

app.post('/upload', errorMiddleware, (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error : error.message });
})

app.use(express.json()); //Automatically parses incoming JSON to an object
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server up on port '+ port);
})
