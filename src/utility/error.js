class ApiError {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }
}

module.exports = ApiError;