class ResponseError extends Error {
    constructor(status, message) {
        super(message) // must be call constructor in parent class (if create construct in child). So, message will send to parent class
        this.status = status // only propt status, because propt message declared in parent class
    }
}

export { ResponseError }