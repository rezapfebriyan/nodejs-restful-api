import { prismaClient } from "../application/database"
import { createAddressValidation } from "../validation/addressValidation"
import { getContactValidation } from "../validation/contactValidation";
import { validate } from "../validation/validation"

const checkContactMustExists = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    });

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found");
    }

    return contactId;
}

const create = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId);

    const address = validate(createAddressValidation, request);
    address.contact_id = contactId;

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

export default { create }