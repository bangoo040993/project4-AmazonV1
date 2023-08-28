//building itemSchema here
const item = require('./item')
const Schema = require('mongoose').Schema

const itemSchema = new Schema({
    name: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    image: String
}, {
    timestamps: true
})

module.exports = itemSchema