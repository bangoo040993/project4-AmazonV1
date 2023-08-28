// seperation of concerns, this file is for the item model
const monogoose = require('mongoose')
require('./category')
const itemSchema = require('./itemSchema')

module.exports = monogoose.model('Item', itemSchema)