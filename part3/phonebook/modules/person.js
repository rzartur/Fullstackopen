const mongoose = require('mongoose')
const dns = require('node:dns/promises')

dns.setServers(['8.8.8.8'])

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'name must be at least 3 characters long'],
    required: [true, 'name is required'],
  },
  number: {
    type: String,
    minLength: [8, '{VALUE} is not valid phone number'],
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
