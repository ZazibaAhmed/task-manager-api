require('../src/db/mongoose')
const Task = require('../src/models/task');

Task.findByIdAndDelete('63440114583da9fd60f420eb').then((task) => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e)
})