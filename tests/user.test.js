const request = require('supertest');
const app = require('../src/app'); 
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
    const response =  await request(app).post('/users').send({
                        name: "Andrew",
                        email: 'andrew@example.com',
                        password: '1234567'
                    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response body
    expect(response.body).toMatchObject({
        user: {
            name: "Andrew",
            email: 'andrew@example.com',
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('1234567');
                   
})

test('Should not signup user with invalid name/email/password', async () => {
    await request(app).post('/users').send({
        name: 1234, // Invalid name
        email: 'andrew@example', 
        password: '123456'
    }).expect(400)
    await request(app).post('/users').send({
        name: "Andrew",
        email: 'andrew@example.com',
        password: '123456' // Invalid password
    }).expect(400)
    await request(app).post('/users').send({
        name: "Andrew",
        email: 'andrew@example', // Invalid email
        password: '123456'
    }).expect(400)       
})

test('Should login an existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // Validate new token is saved
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token); // When logging in, the second token is generated
                   
})

test('Should not login non-existent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrongPassword'
    }).expect(400)
                   
}) 

test('Should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)                
}) 

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)    // Unauthorized user            
}) 

test('Should delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)      
    
    // Validate user is removed
    const user = await User.findById(userOneId);
    expect(user).toBeNull(); 
}) 

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)                
}) 

test('Should upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)  
        
    // Since sharp module modifies th eimage. we willl check
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer)); // check all the properties // checks if what we're looking at is of that type

}) 

test('Should update valid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ 
        name : "EditedMike" 
    })
    .expect(200)       
                    
    // Assertions that the data has been changed
    const user = await User.findById(userOneId);
    expect(user.name).toEqual("EditedMike");
}) 

test('Should not update user if unauthenticated', async () => {
    await request(app)
    .patch('/users/me')
    .send({ 
        name : "EditedMike" 
    })
    .expect(401)       
}) 

test('Should not update invalid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ 
        location : "testLocation" 
    })
    .expect(400)       
}) 

test('Should not update user with invalid name/email/password', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: '', // Invalid name
    })
    .expect(400)
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        password: '123456' // Invalid password
    })
    .expect(400)
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        email: 'andrew@example', // Invalid email
    })
    .expect(400)      
})






