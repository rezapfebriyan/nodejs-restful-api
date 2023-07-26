import {prismaClient} from "../src/application/database.js"
import bcrypt from "bcrypt"

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("secret", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    })
}

export const removeAllTestContact = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: 'test'
        }
    })
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@email.com",
            phone: "087899889977"
        }
    })
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'test'
        }
    })
}

export const createManyTestContact = async () => {
    for (let index = 0; index < 10; index++) {
        await prismaClient.contact.create({
            data: {
                username: "test",
                first_name: `test ${index}`,
                last_name: `test ${index}`,
                email: `test${index}@email.com`,
                phone: `087899889977| ${index}`
            }
        })
    }
}