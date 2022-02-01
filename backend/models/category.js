const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.connect(url)
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const categorySchema = new mongoose.Schema({
  name: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Category',categorySchema)