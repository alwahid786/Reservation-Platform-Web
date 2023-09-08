class Response {
    constructor() {
        this.status = true;
        this.message = '';
        this.body = 'success';
        this.code = 200;
    }
    setError = (code, message = '') => {
        this.status = false;
        this.message = message;
        this.code = code;
    };
    setSuccess = (code, body = 'success') => {
        this.status = true;
        this.body = body;
        this.code = code;
    };
}

module.exports = Response;
