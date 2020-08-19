const CoursRepository = require('./models/CoursRepository');
class CoursController{
    constructor(req, res){
        console.log('CoursController constructor');
        this.req = req;
        this.res = res;
        this.coursRepository = new CoursRepository();
    }
    getAll(){
        console.log('GET: /api/cours');
        // ok status
        this.res.writeHead(200, {'content-type':'application/json'});
        this.res.end(JSON.stringify(this.coursRepository.getAll()));
    }
    get(id){
        console.log('GET: /api/cours/' + id);
        // ok status
        this.res.writeHead(200, {'content-type':'application/json'});
        this.res.end(JSON.stringify(this.coursRepository.get(id)));
    }
    post(cour){  
        console.log('POST: /api/cours/', cour); 
        // todo : validate cour before insertion
        let newCour = this.coursRepository.add(cour);
        if (newCour) {
            // created status
            this.res.writeHead(201, {'content-type':'application/json'});
            this.res.end(JSON.stringify(newCour));
        } else {
            // internal error status
            this.res.writeHead(500, {'content-type':'application/json'});
            this.res.end();
        }
    }
    remove(id){
        console.log('DELETE: /api/cours/' + id); 
        if (this.coursRepository.remove(id))
            // accepted status
            this.res.writeHead(202, {'content-type':'application/json'});
        else
            // not found status
            this.res.writeHead(404, {'content-type':'application/json'});
        this.res.end();
    }
}

module.exports = CoursController;