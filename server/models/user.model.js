const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  FirstName: {
    type: String,
    default: '',
  },
  LastName: {
    type: String,
    default: '',
  },
})

module.exports = model('users', userSchema)
