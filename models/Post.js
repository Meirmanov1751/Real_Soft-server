const {Schema, model} = require('mongoose')

const schema = new Schema({
  title: String,
  content: String
});

module.exports = model('Post', schema)
