import Joi from "joi"

const createContactValidation = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).optional(),
    email: Joi.string().max(100).email().optional(),
    phone: Joi.string().max(15).optional()
})

const getContactValidation = Joi.number().positive().required()

const updateContactValidation = Joi.object({
    id: Joi.number().positive().required(),
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).optional(),
    email: Joi.string().max(100).email().optional(),
    phone: Joi.string().max(15).optional()
})

export { createContactValidation, getContactValidation, updateContactValidation }