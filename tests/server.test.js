const {app, server} = require("../server")
const request = require ("supertest")

test("valid payload test request", async function() {
    const testpayload = {
        name: "test name",
        email: "example@gmail.com",
        interests: "testing"
    }
    const testres= await request(app)
    .post("/upgrade-profile")
    .send(testpayload)

   // expect(testres.status).toBe(200)
    expect(testres.body).toHaveProperty("info")
    expect(testres.body.info).toBe("succesful update user profile data")

    server.close()
})

test("invalid payload test request", async function() {
    const testpayload = {}
    const testres= await request(app)
    .post("/upgrade-profile")
    .send(testpayload)

    // expect(testres.status).toBe(400)
    expect(testres.body).toHaveProperty("error")
    expect(testres.body.error).toBe("invalid payload: coudn't update user profile data")

    server.close()
})