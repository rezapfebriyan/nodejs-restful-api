import Joi from "joi"

const registerUserValidation = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(50).required()
})

export { registerUserValidation }