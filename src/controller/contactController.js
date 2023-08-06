import contactService from "../service/contactService"

const create = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await contactService.create(user, request)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const result = await contactService.get(user, contactId)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const request = req.body
        request.id = contactId

        const result = await contactService.update(user, request)
        
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId

        await contactService.remove(user, contactId)

        res.status(200).json({
            data: "Contact has been removed"
        })
    } catch (error) {
        next(error)
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user
        const request = {
            name: req.params.name,
            email: req.params.email,
            phone: req.params.phone,
            page: req.params.page,
            size: req.params.size
        }

        const result = await contactService.search(user, request)

        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}