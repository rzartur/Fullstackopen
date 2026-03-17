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

module.exports = { dummy, totalLikes, favouriteBlog }