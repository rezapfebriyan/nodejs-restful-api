import supertest from "supertest"
import { web } from "../src/application/web"
import { prismaClient } from "../src/application/database"
import { logger } from "../src/application/logging"

describe('Register user /api/users', function () {
    // delete data in DB after test insert
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: 'rezapf'
            }
        })
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'rezapf',
                password: 'persija1928',
                name: 'Reza PF'
            })
        
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('rezapf')
        expect(result.body.data.name).toBe('Reza PF')
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
                username: 'rezapf',
                password: 'persija1928',
                name: 'Reza PF'
            })
        
        logger.info(result.body)
        
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('rezapf')
        expect(result.body.data.name).toBe('Reza PF')
        expect(result.body.data.password).toBeUndefined()

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'rezapf',
                password: 'persija1928',
                name: 'Reza PF'
            })
        
        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})