const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = require('./itemSchema')


/****************** 
specific item schem and associated functionality to add the prices 
******************/

//this is the schema for the order form per specific item
const lineItemSchema = new Schema({
    qauntity: { type: Number, default: 1 },
    item: itemSchema
}, {
    timestamps: true,
    toJson: { virtuals: true }
})

//this multiplies the quantity by the price of the item
lineItemSchema.virtual('extPrice').get(function() {
    return this.quantity * this.item.price
})

//this is the schema for the order form
const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJson: { virtuals: true }
})

// .reduce method turns the array number of items prices of the same type into a single number and total
orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0)
})

// this .reduce method returns the total number of specific items in the order as a single number
orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, item) => total + item.quantity, 0)
})

// .slice to take the id of the item and return the last 6 characters of the id
orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase()
})

// .toLocaleDateString to return the date of the order
orderSchema.virtual('orderDate').get(function() {
    return new Date(this.createdAt).toLocaleDateString()
})

