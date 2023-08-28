const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app.js')
const PORT = process.env.PORT || 3002
const server = app.listen(`${PORT}`, () => console.log('Testing on PORT'))
const User = require('../models/user.js') //actual naming of routes TBD
let mongoServer; 


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    console.log(mongoServer.getUri()) //ask Jeff about whether it's URL or URI for this project
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Testing Endpoints', () => {

    test('Creating User', async () => {
        const response = await request(app) 
            .post('/user') //ACTUAL ENDPOINT NAME PENDING
            .send({
                userName: "checking",
                email: "checking",
                password: "checking",
                address: "checking",
                paymentInfo: "checking"
            })
        expect(response.statusCode).toBe(200)
        console.log(response.body)
        expect(response.body.newUser.userName).toBe("checking")
        expect(response.body.newUser.email).toBe("checking")
        expect(response.body.newUser.password).toBe("checking")
        expect(response.body.newUser.address).toBe("checking")
        expect(response.body.newUser.paymentInfo).toBe("checking")
        expect(response.body).toHaveProperty('token')
    })
})