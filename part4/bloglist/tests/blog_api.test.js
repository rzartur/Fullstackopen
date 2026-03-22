const {test, after, beforeEach} = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')
const { send } = require('node:process')

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

test('if likes property is missing it defaults to 0', async () => {
    const newBlog = {
        title: "Test name",
        author: "Autor test",
        url: "www.costam1.com",
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    assert.strictEqual(response.body.likes, 0)   
})

test.only('fails with status code 400 when title is missing', async () => {
    const newBlog = {
        author: "Autor test",
        url: "www.costam1.com",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('fails with status code 400 when url is missing', async () => {
    const newBlog = {
        title: "Test name",
        author: "Autor test",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test.only('a note can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))
    
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

after(async () => {
    await mongoose.connection.close()
})