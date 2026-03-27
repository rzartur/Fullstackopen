const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

test('successfully creates a valid user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: "Manuel",
        password: "PasswordSoSo",
        name: "Manio"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)

    assert(usernames.includes('Manuel'))
}) 

test('fails to create a user with username shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: "An",
        password: "ItsMyPassword"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert.ok(result.body.error.includes('username must be at least 3 characters long'))
})

test('creation fails with proper statuscode amd message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'root',
        password: 'ItIsPassword'
    }

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert.ok(response.body.error.includes('expected `username` to be unique'))
})

test('fails to create a user without a username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        password: "ItsMyPassword"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert.ok(result.body.error.includes('username is required'))
})

test('fails to create a user with password shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: "Annna",
        password: "P"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert.ok(result.body.error.includes('password must be at least 3 characters long'))
})

test('fails to create a user without a password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: "Anna"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert.ok(result.body.error.includes('password must be at least 3 characters long'))
})

after(async () => {
    await mongoose.connection.close()
})