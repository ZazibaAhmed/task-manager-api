require('../src/db/mongoose')
const User = require('../src/models/user');

User.findByIdAndUpdate('634325815ab983f9991beb5d', {age: 1}).then((user) => {
    console.log(user);
    return User.countDocuments({age: 1});
}).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e)
})