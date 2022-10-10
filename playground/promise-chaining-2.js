require('../src/db/mongoose')
const Task = require('../src/models/task');

// Task.findByIdAndDelete('63440114583da9fd60f420eb').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: false});
// }).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed : false});
    return count
}

deleteTaskAndCount('63432f213b5e30ef60b23b63')
.then(result => {console.log(result);})
.catch(e => console.log(e));