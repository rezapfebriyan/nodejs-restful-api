import supertest from "supertest"
import {
    createTestContact,
    createTestUser,
    getTestContact,
    removeAllTestAddresses,
    removeAllTestContact,
    removeTestUser
} from "./testUtil.js"
import { web } from "../src/application/web.js"

describe('Create address', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can create address', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: "jalan test",
                city: "test city",
                province: "test province",
                country: "indonesia",
                postal_code: "1928"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe("jalan test")
        expect(result.body.data.city).toBe("test city")
        expect(result.body.data.province).toBe("test province")
        expect(result.body.data.country).toBe("indonesia")
        expect(result.body.data.postal_code).toBe("1928")
    })

    it('should reject if address request is invalid', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: "jalan test",
                city: "",
                province: "test province",
                country: "indonesia",
                postal_code: 1928
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})