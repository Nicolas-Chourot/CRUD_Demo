class Response {
    constructor (res){
        this.res = res;
    }
    status(number){
        this.res.writeHead(number, {'content-type':'text/plain'});
        this.res.end();
    }
    ok() {
        // ok status
        this.status(200);
    }
    
    accept() {
        // accepted status
        this.status(202);
    }
    created(json) {
        this.res.writeHead(201, {'content-type':'application/json'});
        this.res.end(JSON.stringify(json));
    }
    JSON(json) {
        this.res.writeHead(200, {'content-type':'application/json'});
        this.res.end(JSON.stringify(json));
    }
    notFound() {
        // not found status
        this.status(404);
    }
    unsupported () {
        // Unsupported Media Type status
        this.status(415);
    }
    unprocessable() {
        // Unprocessable Entity status
        this.status(422);
    }
    badRequest() {
        // bad request status
        this.status(400);
    }
    internalError() {
        // bad request status
        this.status(500);
    }
}

module.exports = Response;