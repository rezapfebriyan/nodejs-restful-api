import { ResponseError } from "../error/responseError.js"

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false // validate all request, not only one
    })

    if(result.error) {
        throw new ResponseError(400, result.error.message)
    }
    return result.value
}

export { validate }