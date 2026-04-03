const {test, after, beforeEach, describe} = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        
        await User.deleteMany({})

        const user = await helper.getUser()
        const savedUser = await user.save()   

        const id = savedUser._id

        const blogs = helper.initialBlogs.map(b => {
            return {...b, user: id}
        })

        await Blog.insertMany(blogs)
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

    test.only('a valid blog can be added', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const newBlog = {
            title: "Test name",
            author: "Autor test",
            url: "www.costam1.com",
            likes: 4,
        }
        
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'Wojtek', password: 'admin' })
        
        const token = loginResponse.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
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

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'Wojtek', password: 'admin'})
            .expect(200)
        
        const token = loginResponse.body.token

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)

        assert.strictEqual(response.body.likes, 0)   
    })

    test('fails with status code 400 when title is missing', async () => {
        const newBlog = {
            author: "Autor test",
            url: "www.costam1.com",
        }

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'Wojtek', password: 'admin'})
            .expect(200)
        
        const token = loginResponse.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('fails with status code 400 when url is missing', async () => {
        const newBlog = {
            title: "Test name",
            author: "Autor test",
        }

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'Wojtek', password: 'admin'})
            .expect(200)

        const token = loginResponse.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'Wojtek', password: 'admin'})
            .expect(200)

        const token = loginResponse.body.token

        console.log('TOKEN', token);
        

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()

        const ids = blogsAtEnd.map(b => b.id)
        assert(!ids.includes(blogToDelete.id))
        
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('sucessfully updates likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            likes: 100
        }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)

        assert.strictEqual(response.body.likes, 100)

        assert.strictEqual(response.body.id, blogToUpdate.id)
        
    })
})

after(async () => {
    await mongoose.connection.close()
})