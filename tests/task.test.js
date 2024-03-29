const request = require('supertest');
const app = require('../src/app'); 
const Task = require('../src/models/task'); 
const { userOneId, userOne, userTwo, taskOne, taskTwo, taskThree, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response =  await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "From my test",
        })
        .expect(201)

    // Assert that the database was changed correctly
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);   
})

test('Should not create task with invalid description/completed', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "", // Invalid description
        })
        .expect(500)

        await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "Task",
            completed: "", // Invalid completed
        })
        .expect(500)
})

test('Should fetch user one tasks', async () => {
    const response =  await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200) 
    
     // User one has 2 tasks
     expect(response.body.length).toEqual(2);   
}) 

test('Should fetch user task by id', async () => {
    const response =  await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200); 
}) 

test('Should not fetch user task by id if unauthenticated', async () => {
    const response =  await request(app)
        .get(`/tasks/${taskOne._id}`)
        .send()
        .expect(401); 
}) 

test('Should not fetch other users task by id', async () => {
    const response =  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);  
}) 

test('Should fetch only completed tasks', async () => {
    const response =  await request(app)
    .get(`/tasks?completed=true`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);   

    expect(response.body.length).toEqual(1);  
})

test('Should fetch only incomplete tasks', async () => {
    const response =  await request(app)
    .get(`/tasks?completed=false`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);   
    
    expect(response.body.length).toEqual(1);  
})

// Should sort tasks by description/completed/createdAt/updatedAt
test('Should sort tasks by description/completed/createdAt/updatedAt', async () => {
    let response =  await request(app)
    .get(`/tasks?sortBy=createdAt_desc`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200); 
    
    expect(response.body[0].description).toBe(taskTwo.description);

    response =  await request(app)
    .get(`/tasks?sortBy=description_desc`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200); 

    expect(response.body[0].description).toBe(taskTwo.description);

    
})

test('Should fetch page of tasks', async () => {
    let response =  await request(app)
    .get(`/tasks?limit=1&skip=0`) // 1st page of 1 item
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);   
    
    expect(response.body.length).toEqual(1);
    
    response =  await request(app)
    .get(`/tasks?limit=2&skip=2`) // second page of 2 items
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);   
    
    expect(response.body.length).toEqual(0);
})

test('Should delete users tasks', async () => {
    const response =  await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200) 

    const task = await Task.findById(taskOne._id);
    expect(task).toBeNull();  
}) 

test('Should not delete other user tasks', async () => {
    const response =  await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404) 

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();  
}) 

test('Should not delete task if unauthenticated', async () => {
    const response =  await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .send()
        .expect(401) 

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();  
}) 

test('Should update users tasks', async () => {
    const response =  await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "EditedTask"
        })
        .expect(200) 

    const task = await Task.findById(taskOne._id);
    expect(task.description).toBe("EditedTask");  
}) 

test('Should not update task with invalid description/completed', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "" // Invalid description
        })
        .expect(400) 

    await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        completed: "", // Invalid completed
    })
    .expect(400) 

}) 

test('Should not update other users task', async () => {
    const response =  await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            description: "EditedTask"
        })
        .expect(404) 
}) 





