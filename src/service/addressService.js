import { prismaClient } from "../application/database"
import { ResponseError } from "../error/responseError.js"
import {
    createAddressValidation,
    getAddressValidation,
    updateAddressValidation
} from "../validation/addressValidation"
import { getContactValidation } from "../validation/contactValidation"
import { validate } from "../validation/validation"

const checkContactMustExists = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found")
    }

    return contactId
}

const create = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId)

    const address = validate(createAddressValidation, request) // all request data
    address.contact_id = contactId

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const get = async (user, contactId, addressId) => {
    contactId = await checkContactMustExists(user, contactId)
    addressId = validate(getAddressValidation, addressId)

    const address = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    if (!address) {
        throw new ResponseError(404, "address is not found")
    }

    return address
}

const update = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId)
    const address = validate(updateAddressValidation, request) // all request data

    const countAddressInDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id
        }
    })

    if (countAddressInDatabase !== 1) {
        throw new ResponseError(404, "address is not found")
    }

    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const remove = async (user, contactId, addressId) => {
    contactId = await checkContactMustExists(user, contactId)
    addressId = validate(getAddressValidation, addressId)

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: addressId
        }
    })

    if (totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "address is not found")
    }

    return prismaClient.address.delete({
        where: {
            id: addressId
        }
    })
}

export default { create, get, update, remove }