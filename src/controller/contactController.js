import contactServise from "../service/contactServise.js"

const create = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await contactServise.create(user, request)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default { create }