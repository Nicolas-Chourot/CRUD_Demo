const Response = require('../Response.js');
module.exports = class Controller {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.response = new Response(res);
    }
    getAll(){
        this.response.notFound();
    }
    get(id){
        this.response.notFound();
    }
    post(obj){  
        this.response.notAloud();
    }
    put(obj){
        this.response.notAloud();
    }
    patch(obj){
        this.response.notAloud();
    }
    remove(id){
        this.response.notAloud();
    }
}

//module.exports = Controller;