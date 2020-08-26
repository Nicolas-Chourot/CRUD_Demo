const Repository = require('../models/Repository');
const Controller = require('./Controller');
class CoursController extends Controller {
    constructor(req, res){
        console.log('CoursController constructor');
        super(req, res);
        this.coursRepository = new Repository('Cours');
    }
    getAll(){
        this.response.JSON(this.coursRepository.getAll());
    }
    get(id){
        if(!isNaN(id))
            this.response.JSON(this.coursRepository.get(id));
        else
            this.response.JSON(this.coursRepository.getAll());
    }
    post(cours){  
        // todo : validate cour before insertion
        // todo : avoid duplicates
        let newCours = this.coursRepository.add(cours);
        if (newCours) 
            this.response.created(JSON.stringify(newCours));
         else 
            this.response.internalError();
    }
    put(cours){
        // todo : validate contact before insertion
        if (this.coursRepository.update(cours))
            this.response.ok();
        else 
            this.response.notFound();
    }
    remove(id){
        if (this.coursRepository.remove(id))
            this.response.accept();
        else
            this.response.notFound();
    }
}

module.exports = CoursController;