import supertest from "supertest"
import { 
    createTestContact,
    createTestUser,
    getTestContact,
    removeAllTestContact,
    removeTestUser 
} from "./testUtil.js"
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

describe('Get contact by id', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe(testContact.first_name)
        expect(result.body.data.last_name).toBe(testContact.last_name)
    })

    it('should return 404 if contact_id not found', async () => {
        const result = await supertest(web)
            .get('/api/contacts/9999')
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
    })
})

describe('Update contact', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can update existing contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "Reza",
                last_name: "Putra",
                email: "rezapf@gmail.com",
                phone: "087855447700"
            })
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe("Reza")
        expect(result.body.data.last_name).toBe("Putra")
        expect(result.body.data.email).toBe("rezapf@gmail.com")
        expect(result.body.data.phone).toBe("087855447700")
    })

    it('should reject if invalid request', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "",
                email: "rezamail.com",
                phone: 999
            })
        
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if contact is not found', async () => {

        const result = await supertest(web)
            .put('/api/contacts/99')
            .set('Authorization', 'test')
            .send({
                first_name: "Reza",
                last_name: "Putra",
                email: "rezapf@gmail.com",
                phone: "087855447700"
            })
        
        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })
})

describe('Delete contact', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can delete contact', async () => {
        let testContact = await getTestContact()

        const result = await supertest(web)
            .delete('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data).toBe('Contact has been removed')

        // check removed or failed remove
        testContact = await getTestContact()
        expect(testContact).toBeNull()
    })
})