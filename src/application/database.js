import { PrismaClient } from "@prisma/client"
import { logger } from "./logging"

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'even',
            level: 'query'
        },
        {
            emit: 'even',
            level: 'error'
        },
        {
            emit: 'even',
            level: 'info'
        },
        {
            emit: 'even',
            level: 'warn'
        }
    ]
})

// send logging from ORM
prismaClient.$on('error', (e) => {
    logger.error(e)
})

prismaClient.$on('warn', (e) => {
    logger.warn(e)
})

prismaClient.$on('info', (e) => {
    logger.info(e)
})

prismaClient.$on('query', (e) => {
    logger.info(e)
})