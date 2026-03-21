const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.length === 0 ? null : blogs.reduce((most, current) => {
        return most.likes > current.likes ? most : current
    })
}

const mostBlogs = (blogs) => {

}

const collection = [
    {
        author: "Robert C. Martin",
        blogs: 3
    },
    {
        author: "Alojzy C. Buba",
        blogs: 2
    },
]

const authors = _.countBy(collection, 'author')
console.log(authors);


module.exports = { dummy, totalLikes, favouriteBlog }