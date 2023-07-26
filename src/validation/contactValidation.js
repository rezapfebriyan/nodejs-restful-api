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

const searchContactValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(50).default(10),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()
})

export { createContactValidation, getContactValidation, updateContactValidation, searchContactValidation }