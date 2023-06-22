import express from "express"
import { authMiddleware } from "../middleware/auth"
import userController from "../controller/userController.js"

const userRouter = new express.Router()

userRouter.use(authMiddleware);

userRouter.get('/api/users/current', userController.get)

export { userRouter }