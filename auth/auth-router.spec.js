const request = require("supertest");
const server = require("../api/server");

describe("the auth-router",() => {

    describe("POST /register", () => {

        it("responds with json", () => {
            request(server)
                .post("/api/auth/register")
                .send({ username:"admin", password:"admin"})
                .set("Accept","application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err,res) =>{
                    if(err) return document(err);
                    else(done())
                })
        })
    })

    
        describe('/login',() => {
        it("responds with json", () => {
            request(server)
                .post("/api/auth/register")
                .send({ username:"admin", password:"admin"})
                .set("Accept","application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err,res) =>{
                    if(err) return (err);
                    else(done())
                })
        })
    })
})