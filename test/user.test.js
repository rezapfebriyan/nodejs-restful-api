import supertest from "supertest"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { createTestUser, getTestUser, removeTestUser } from "./testUtil"
import bcrypt from "bcrypt"

describe('Register user', function () {
    afterEach(async () => {
        await removeTestUser()
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'secret',
                name: 'test'
            })
        
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
        expect(result.body.data.password).toBeUndefined()
    })

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            })
        
        logger.info(result.body)
         
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'secret',
                name: 'test'
            })
        
        logger.info(result.body)
        
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
        expect(result.body.data.password).toBeUndefined()

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'secret',
                name: 'test'
            })
        
        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe('Login user', function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "secret"
            })

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe("test")
    })

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: ""
            })

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject login if invalid credentials', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "nbbv"
            })

        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('Get current user', function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
    })

    it('should reject if invalid token', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'wrong')

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('Update user', function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can edit user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: "Reza",
                password: "secretpassword"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("Reza")

        const user = await getTestUser()
        expect(await bcrypt.compare("secretpassword", user.password)).toBe(true)
    })

    it('should can edit user password only', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: "secretpassword"
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")

        const user = await getTestUser()
        expect(await bcrypt.compare("secretpassword", user.password)).toBe(true)
    })

    it('should reject if invalid request', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'wrong')
            .send({})

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})
