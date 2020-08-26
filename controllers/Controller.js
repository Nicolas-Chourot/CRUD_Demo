const Response = require('../Response.js');
class Controller {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.response = new Response(res);
    }
}

module.exports = Controller;