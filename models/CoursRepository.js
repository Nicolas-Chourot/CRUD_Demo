const Cours = require('./Cours');
const fs = require('fs');

class CoursRepository {
    constructor(){
        this.coursList = [];
        this.coursFile = './data/cours.json';
        this.read();
    }
    read() {
        // the sync version of readFile prevent from concurent io
        try{
            let rawdata = fs.readFileSync(this.coursFile);
            this.coursList = JSON.parse(rawdata);
        } catch(error) {
            if (error.code === 'ENOENT') {
                // file does not exist, it will be created on demand
                this.coursList = [];
            }
        }
    }
    write() {
        // the sync version of writeFile prevent from concurent io
        fs.writeFileSync(this.coursFile, JSON.stringify(this.coursList));
        this.read();
    }
    nextId() {
        let maxId = 0;
        for(let cours of this.coursList){
            if (cours.Id > maxId) {
                maxId = cours.Id;
            }
        }
        return maxId + 1;
    }
    add(cours) {
        try {
            cours.Id = this.nextId();
            this.coursList.push(cours);
            this.write();
            return cours;
        } catch(error) {
            return null;
        }
    }
    getAll() {
        return this.coursList;
    }
    get(id){
        for(let cours of this.coursList){
            if (cours.Id === id) {
               return cours;
            }
        }
        return null;
    }
    remove(id) {
        let index = 0;
        for(let cours of this.coursList){
            if (cours.Id === id) {
                this.coursList.splice(index,1);
                this.write();
                return true;
            }
            index ++;
        }
        return false;
    }
    update(coursToModify) {
        let index = 0;
        for(let cours of this.coursList){
            if (cours.Id === coursToModify.Id) {
                this.coursList[index] = coursToModify;
                this.write();
                return true;
            }
            index ++;
        }
        return false;
    }
}

module.exports = CoursRepository;