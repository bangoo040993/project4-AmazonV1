const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { array } = require('prop-types')
const Schema = mongoose.Schema

//not sure if this is going to break anything, 10-12 is the standard industry number of rounds for hashing
const SALT_ROUNDS = 10

/********************** 
this is the user model schema
***********************/

const userSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            lowercase: true, 
            unique: true 
        },
        password: { 
            type: String, 
            trim: true,
            minlength: 3,
            required: true
        },
        address: {
            street: string,
            city: string,
            state: string,
            zip: string,
            lowercase: true,
            trim: true,
            required: true
        },
        phoneNumber: {
            type: String,
            trim: true,
            required: true
        },
        wishList: {} //does this need to be a seperate model? i think it does
    },
    {
        timestamps: true,
        toJSON: {
            transorm : function (doc, ret) {
                delete ret.password
                return ret
            }
        }
    }
)

userSchema.pre('save', async function(next) {
    // single line if statement, if password is not modified, return next
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next()
})