import supertest from "supertest"
import { createTestUser, removeAllTestContact, removeTestUser } from "./testUtil.js"
import { web } from "../src/application/web.js"

describe('Create contact', function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can create new contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@email.com",
                phone: "087899889977"
            })
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe("test")
        expect(result.body.data.last_name).toBe("test")
        expect(result.body.data.email).toBe("test@email.com")
        expect(result.body.data.phone).toBe("087899889977")
    })

    it('should reject if invalid request', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "test",
                email: "testemail.com",
                phone: "087899889977897845894578"
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})