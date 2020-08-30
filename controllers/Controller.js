const Response = require('../Response.js');
/////////////////////////////////////////////////////////////////////
// Important note about controllers:
// You must respect pluralize convention: 
// For ressource name RessourName you have to name the controller
// RessourceNamesController that must inherit from Controller class
// in order to have proper routing from request to controller action
/////////////////////////////////////////////////////////////////////
module.exports = 
class Controller {
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