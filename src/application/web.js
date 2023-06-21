import express from "express"
import { publicRouter } from "../route/publicApi.js"
import { errorMiddleware } from "../middleware/error.js"

export const web = express()

web.use(express.json())
web.use(publicRouter)
web.use(errorMiddleware)