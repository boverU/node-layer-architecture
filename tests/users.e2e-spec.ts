import { App } from "../src/app";
import { boot } from "../src/main";
import request from 'supertest';


let application: App;

beforeAll(async ()=>{
    const res = await boot;
    application = res.app;
})


describe("Users e2e ", () =>{
    it("Register: error", async ()=>{
        const res = await request(application.app)
        .post('/users/register')
        .send({
            email: "aidyn@gmail.com",
	        password: "pass"
        })

        expect(res.statusCode).toBe(422)
    })
})

afterAll(()=>{
    application.close();
})