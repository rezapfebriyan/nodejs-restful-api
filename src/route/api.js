import express from "express"
import { authMiddleware } from "../middleware/auth.js"
import userController from "../controller/userController.js"
import contactController from "../controller/contactController.js"

const userRouter = new express.Router()

userRouter.use(authMiddleware);

//         User
userRouter.get('/api/users/current', userController.get)
userRouter.patch('/api/users/current', userController.update)
userRouter.delete('/api/users/logout', userController.logout)

//         Contact
userRouter.post('/api/contacts', contactController.create)
userRouter.get('/api/contacts/:contactId', contactController.get)

export { userRouter }