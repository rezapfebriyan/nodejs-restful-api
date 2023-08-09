import supertest from "supertest"
import { 
    createTestAddress,
    createTestContact,
    createTestUser,
    getTestAddress,
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

describe('Get address contact', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can get contact include address', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe("jalan test")
        expect(result.body.data.city).toBe("test city")
        expect(result.body.data.province).toBe("test province")
        expect(result.body.data.country).toBe("indonesia")
        expect(result.body.data.postal_code).toBe("1928")
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .get('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    });

    it('should reject if address is not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .get('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    });
})

describe('Update contact address', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddresses()
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can update address', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
            .set('Authorization', 'test')
            .send({
                street: "update jalan test",
                city: "test update city",
                province: "test update province",
                country: "indonesia",
                postal_code: "131928"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testAddress.id)
        expect(result.body.data.street).toBe("update jalan test")
        expect(result.body.data.city).toBe("test update city")
        expect(result.body.data.province).toBe("test update province")
        expect(result.body.data.country).toBe("indonesia")
        expect(result.body.data.postal_code).toBe("131928")
    })

    it('should reject if request is not valid', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
            .set('Authorization', 'test')
            .send({
                street: "street",
                city: 'city',
                province: true,
                country: '',
                postal_code: 1928
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if address (or contact) is not found', async () => {

        const result = await supertest(web)
            .put('/api/contacts/99/addresses/99')
            .set('Authorization', 'test')
            .send({
                street: "jalan test",
                city: "test city",
                province: "test province",
                country: "indonesia",
                postal_code: "1928"
            })

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })
})
