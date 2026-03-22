const {test, after, beforeEach} = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api 
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(helper.initialBlogs.length, response.body.length)
})

test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert.ok(blog.id)

    assert.strictEqual(blog._id, undefined)
})

test('a valid blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
        title: "Test name",
        author: "Autor test",
        url: "www.costam1.com",
        likes: 4,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
 
    assert(titles.includes('Test name'))
})

after(async () => {
    await mongoose.connection.close()
})