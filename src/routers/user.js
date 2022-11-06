const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer');

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000 // 1Mb
    },
    fileFilter(req, file, cb){

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image!'))
        }

        cb(undefined, true);

        // cb(new Error('Please upload a PDF')) // when error occurs
        // cb(undefined, true) // when upload is fine; Accepts it
        // cb(undefined, false) // silently rejects the call
    }
})


router.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        await  user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token});
    } catch (error) {
        res.status(400).send(error); 
    }
   
})

router.post('/users/login', async (req, res) => {
  
    try {
       const user = await User.findByCredentials(req.body.email, req.body.password);
       const token = await user.generateAuthToken();
       res.send({ user, token});

    } catch (error) {
        res.status(400).send(error); 
    }
   
})

router.post('/users/logout', auth, async (req, res) => {
  
    try {
       req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
       });

       await req.user.save();
       res.send();

    } catch (error) {
        res.status(500).send(); 
    }
   
})

router.post('/users/logoutAll', auth, async (req, res) => {
  
    try {
       req.user.tokens = [];
       await req.user.save();
       res.send();

    } catch (error) {
        res.status(500).send(); 
    }
   
})

router.get('/users', auth, async (req, res) => {

    try {
        const users = await  User.find({});
        res.status(201).send(users);
    } catch (error) {
        res.status(500).send(); 
    }

})

router.get('/users/me', auth, async (req, res) => {

  res.send(req.user);

})

// router.get('/users/:id', async (req, res) => {

//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);

//         if(!user){
//             return res.status(404).send();
//         }

//         res.send(user);
//     } catch (error) {
//         res.status(500).send(); 
//     }
// })

router.patch('/users/me', auth, async (req, res) => {

    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((key) => allowedUpdates.includes(key)); 

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates!'});
    }

    try { 
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        // const user = await User.findByIdAndUpdate(_id, req.body, { new : true, runValidators: true });
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error); 
    }
})

router.delete('/users/me', auth, async (req, res) => {

    try {
        // const user = await User.findByIdAndDelete(req.params.id);
        // if(!user){
        //     return res.status(404).send();
        // }

        await req.user.remove();
        res.send(req.user);

    } catch (error) {
        res.status(500).send(); 
    }
})


router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
})

module.exports = router;