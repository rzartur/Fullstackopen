const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const user = require('../models/user')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'user missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  console.log('savedBlog:', savedBlog);
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

    if (decodedToken.id !== blog.user.toString()) {
    return response.status(401).json({ error: 'no permissions to delete blog' })
  }
  
  await Blog.findByIdAndDelete(blog.id)

  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)
  await user.save()


  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.title = body.title ?? blog.title
  blog.author = body.author ?? blog.author
  blog.url = body.url ?? blog.url
  blog.likes = body.likes ?? blog.likes

  const updatedBlog = await blog.save()
  response.json(updatedBlog)

})

module.exports = blogsRouter