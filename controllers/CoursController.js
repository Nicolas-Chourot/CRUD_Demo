const Repository = require('../models/Repository');
class CoursController{
    constructor(req, res){
        console.log('CoursController constructor');
        this.req = req;
        this.res = res;
        this.coursRepository = new Repository('Cours');
    }
    getAll(){
        console.log('GET: /api/cours');
        // ok status
        this.res.writeHead(200, {'content-type':'application/json'});
        this.res.end(JSON.stringify(this.coursRepository.getAll()));
    }
    get(id){
        if(!isNaN(id)) {
            console.log('GET: /api/cours/' + id);
            // ok status
            this.res.writeHead(200, {'content-type':'application/json'});
            this.res.end(JSON.stringify(this.coursRepository.get(id)));
        } else {
            console.log('GET: /api/cours');
            // ok status
            this.res.writeHead(200, {'content-type':'application/json'});
            this.res.end(JSON.stringify(this.coursRepository.getAll()));
        }
    }
    post(cours){  
        console.log('POST: /api/cours/', cours); 
        // todo : validate cour before insertion
        // todo : avoid duplicates
        let newCours = this.coursRepository.add(cours);
        if (newCours) {
            // created status
            this.res.writeHead(201, {'content-type':'application/json'});
            this.res.end(JSON.stringify(newCours));
        } else {
            // internal error status
            this.res.writeHead(500, {'content-type':'text/plain'});
            this.res.end();
        }
    }
    put(cours){
        console.log('PUT: /api/cours/', cours); 
        // todo : validate contact before insertion
        if (this.contactsRepository.update(cours)){
            // ok status
            this.res.writeHead(200, {'content-type':'text/plain'});
            this.res.end();
        } else {
            // not found status
            this.res.writeHead(404, {'content-type':'text/plain'});
            this.res.end();
        }
    }
    remove(id){
        console.log('DELETE: /api/cours/' + id); 
        if (this.coursRepository.remove(id))
            // accepted status
            this.res.writeHead(202, {'content-type':'text/plain'});
        else
            // not found status
            this.res.writeHead(404, {'content-type':'text/plain'});
        this.res.end();
    }
}

module.exports = CoursController;