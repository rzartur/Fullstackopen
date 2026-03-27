const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Pierwsza nazwa",
        author: "Autor 1",
        url: "www.costam1.com",
        likes: 10,
    },
    {
        title: "Druga nazwa",
        author: "Autor 2",
        url: "www.costam2.com",
        likes: 5,
    }
]

const initialUsers = [
    {
        username: "root",
        name: "Krzysiu",
        passwordHash: "admin",
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})

    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})

    return users.map(u => u.toJSON())
}

module.exports = { 
    initialBlogs,
    blogsInDb,
    usersInDb,
    initialUsers
}